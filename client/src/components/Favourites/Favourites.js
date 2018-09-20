import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { getFavourites } from '../../utils/FavouriteUtil';
import List from '../platform/List';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';
import InfoMessage from '../InfoMessage/InfoMessage';
import Button from '../platform/Button';
import Select from '../platform/Select';

const Container = styled.div`
    margin-top: 0.5rem; 
`;

const TitleContainer = styled.label`
    display: inline-block; 
    font-weight: bold; 
    margin-top: 0.5rem; 
`;

const LIMITED_MAX_TO_DISPLAY = 5; 
const DISPLAY_ALL_MAX_TO_DISPLAY = 10; 

class Favourites extends React.Component {

    constructor(props) {
        super(props);

        this.state = { favourites: [] };
        this.onFavouriteClicked = this.onFavouriteClicked.bind(this);
        this.onUnFavourite = this.onUnFavourite.bind(this);

        this.FavouritesRenderBy = ({ ...otherProps, item }) => {
            return (
                <li {...otherProps}>
                    <StopInfo {...item} 
                              canUpdateFavourite={true} 
                              shouldShowOperators={false} 
                              onUnFavourite={this.onUnFavourite} />
                </li>
            );
        };
    }

    componentDidMount() {
        const favourites = getFavourites(); 

        const mappedFavourites = favourites.map(favourite => {
            const stopToFill = new StopModel(); 
            Object.assign(stopToFill, favourite);

            return stopToFill; 
        });

        this.setState({ favourites: mappedFavourites });
    }

    onFavouriteClicked(item) {
        this.props.history.push(`/stops/${item.stopId}`);
    }

    onUnFavourite(stopId) {
        const index = this.state.favourites.findIndex(fav => fav.stopId === stopId);
        const newFavourites = [...this.state.favourites];
        newFavourites.splice(index, 1);
        this.setState({ favourites: newFavourites });
    }

    render() {
        const title = <TitleContainer>Favourites</TitleContainer>;

        if (!this.state.favourites || !this.state.favourites.length) {
            return (
                <div>
                    {title}
                    <InfoMessage>You do not have any favourites to display yet.</InfoMessage>
                </div>
            ); 
        } 
        
        if (this.props.displayAll) {
            return <div>Display all here</div>
        }

        const hasMoreThanLimit = this.state.favourites.length > LIMITED_MAX_TO_DISPLAY
        const limited = hasMoreThanLimit 
            ? this.state.favourites.slice(0, LIMITED_MAX_TO_DISPLAY)
            : this.state.favourites;
        return (
            <Container>
                {title}
                <Select inline right>
                    <option value="">Sort</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alpha">A-Z</option>
                </Select>
                <List items={limited} 
                        renderBy={this.FavouritesRenderBy} 
                        useKey="stopId" 
                        onItemClick={this.onFavouriteClicked} />
                {hasMoreThanLimit && <Button link right>View All Favourites</Button>}
            </Container>
        )
        
    }

};

Favourites.defaultProps = {
    displayAll: false
};

Favourites.propTypes = {
    displayAll: PropTypes.bool
};

export default withRouter(Favourites); 