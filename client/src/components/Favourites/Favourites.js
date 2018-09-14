import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { getFavourites } from '../../utils/FavouriteUtil';
import List from '../platform/List';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';
import InfoMessage from '../InfoMessage/InfoMessage';

const FavouritesRenderBy = ({ ...otherProps, item }) => {
    return (
        <li {...otherProps}><StopInfo {...item} canUpdateFavourite={true} shouldShowOperators={false} /></li>
    );
};

const TitleContainer = styled.label`
    display: block; 
    font-weight: bold; 
    margin-top: 0.5rem; 
`;

// TODO: Restrict number of favourites to display? 
class Favourites extends React.Component {

    constructor(props) {
        super(props);

        this.state = { favourites: [] };
        this.onFavouriteClicked = this.onFavouriteClicked.bind(this);
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

    render() {
        const title = <TitleContainer>Favourites</TitleContainer>;

        if (!this.state.favourites || !this.state.favourites.length) {
            return (
                <div>
                    {title}
                    <InfoMessage>You do not have any favourites to display yet.</InfoMessage>
                </div>
            ); 
        } else {
            return (
                <div>
                    {title}
                    <List items={this.state.favourites} 
                          renderBy={FavouritesRenderBy} 
                          useKey="stopId" 
                          onItemClick={this.onFavouriteClicked} />
                </div>
            )
        }
    }

}

export default withRouter(Favourites); 