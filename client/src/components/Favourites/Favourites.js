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
    display: ${props => props.block ? 'block' : 'inline-block'}; 
    font-weight: bold; 
    margin-top: 0.5rem; 
`;

const LIMITED_MAX_TO_DISPLAY = 5; 
const DISPLAY_ALL_MAX_TO_DISPLAY = 10; 
const OLDEST_FIRST = 'oldest';
const NEWEST_FIRST = 'newest';
const ALPHA_SORT = 'alpha';

class Favourites extends React.Component {

    constructor(props) {
        super(props);

        this.state = { favourites: [] };
        this.onFavouriteClicked = this.onFavouriteClicked.bind(this);
        this.onUnFavourite = this.onUnFavourite.bind(this);
        this.onSortingChanged = this.onSortingChanged.bind(this);

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

    onSortingChanged(e) {
        const sortBy = e.target.value; 
        const unSorted = [...this.state.favourites];

        const sorted = unSorted.sort((a, b) => {
            switch (sortBy) {

                case OLDEST_FIRST: 
                    return a.dateFavourited > b.dateFavourited; 
                case NEWEST_FIRST: 
                    return a.dateFavourited < b.dateFavourited;
                case ALPHA_SORT: 
                    return a.stopName > b.stopName; 
                default: 
                    console.warn('Unsupported sort operation', sortBy);
                    return 0; 
            }
        });

        this.setState({ favourites: sorted });
    }

    render() {

        if (!this.state.favourites || !this.state.favourites.length) {
            return (
                <div>
                    <TitleContainer block>Favourites</TitleContainer>
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
                <TitleContainer>Favourites</TitleContainer>
                <Select onChange={this.onSortingChanged} inline right>
                    <option value="">Sort By</option>
                    <option value={NEWEST_FIRST}>Newest First</option>
                    <option value={OLDEST_FIRST}>Oldest First</option>
                    <option value={ALPHA_SORT}>A-Z</option>
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