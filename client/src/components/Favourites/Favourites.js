import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFavourites, updateFavourite } from '../../utils/FavouriteUtil';
import { event } from '../../utils/AnalyticsManager';
import List from '../platform/List';
import Pager from '../Pager/Pager';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';
import InfoMessage from '../InfoMessage/InfoMessage';
import Button from '../platform/Button';
import Select from '../platform/Select';

const FAVOURITES_ANALYTICS_CATEGORY = 'Favoutites';

const Container = styled.div`
    margin-top: 0.5rem; 
`;

const TitleContainer = styled.label`
    display: ${props => props.block ? 'block' : 'inline-block'}; 
    font-weight: bold; 
    margin-top: 0.5rem; 
`;

const StyledUndoButton = styled(Button)`
    color: ${props => props.theme.background};
    text-transform: uppercase; 
`;

const UndoComponentContainer = styled.div`
    display: flex; 
    justify-content: space-between;
    padding: 0.5rem; 
`;

const UndoComponent = ({ closeToast, removedFavourite, undo }) => (
    <UndoComponentContainer>
        {removedFavourite.stopName} removed from favourites.  
        <StyledUndoButton link onClick={undo.bind(null, closeToast)}>Undo</StyledUndoButton>
    </UndoComponentContainer>
);

const LIMITED_MAX_TO_DISPLAY = 5; 
const DISPLAY_ALL_MAX_TO_DISPLAY = 10; 
const OLDEST_FIRST = 'oldest';
const NEWEST_FIRST = 'newest';
const ALPHA_SORT = 'alpha';

class Favourites extends React.Component {

    constructor(props) {
        super(props);

        this.state = { favourites: [], sortBy: null };
        this.onFavouriteClicked = this.onFavouriteClicked.bind(this);
        this.onUnFavourite = this.onUnFavourite.bind(this);
        this.onSortingChanged = this.onSortingChanged.bind(this);
        this.onViewAllFavouritesClicked = this.onViewAllFavouritesClicked.bind(this);
        this.renderFavouritesList = this.renderFavouritesList.bind(this);

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
        event({
            category: FAVOURITES_ANALYTICS_CATEGORY,
            action: 'Clicked a favourite',
            label: item.stopId
        });
        this.props.history.push(`/stops/${item.stopId}`);
    }

    onViewAllFavouritesClicked() {
        this.props.history.push('/favourites');
    }

    onUnFavourite(stopId) {
        const index = this.state.favourites.findIndex(fav => fav.stopId === stopId);

        const copyOfFav = Object.assign({}, this.state.favourites[index]);
        const undo = (closeToast) => {
            let newFavourites = [...this.state.favourites];
            newFavourites.push(copyOfFav);

            updateFavourite(copyOfFav, true);
            this.setState({ favourites: newFavourites });

            event({
                category: FAVOURITES_ANALYTICS_CATEGORY,
                action: 'Undid favourite removal',
                label: stopId
            });
            closeToast(); 
        }
        toast.info(<UndoComponent removedFavourite={copyOfFav} undo={undo} />, {
            position: toast.POSITION.BOTTOM_CENTER,
            closeOnClick: false,
            closeButton: false
        });


        let newFavourites = [...this.state.favourites];
        newFavourites.splice(index, 1);

        if (this.state.sortBy) {
            newFavourites = this.doSort(this.state.sortBy, newFavourites);
        }

        event({
            category: FAVOURITES_ANALYTICS_CATEGORY,
            action: 'Removed a favourite',
            label: stopId
        });

        this.setState({ favourites: newFavourites });
    }

    doSort(sorting, unSorted) {
        return unSorted.sort((a, b) => {
            switch (sorting) {

                case OLDEST_FIRST: 
                    return a.dateFavourited > b.dateFavourited; 
                case NEWEST_FIRST: 
                    return a.dateFavourited < b.dateFavourited;
                case ALPHA_SORT: 
                    return a.stopName > b.stopName; 
                default: 
                    console.warn('Unsupported sort operation', sorting);
                    return 0; 
            }
        });
    }

    onSortingChanged(e) {
        const sortBy = e.target.value; 
        const sorted = this.doSort(sortBy, [...this.state.favourites]);

        event({
            category: 'User',
            action: 'Sorted favourites',
            value: sortBy
        });
        this.setState({ favourites: sorted, sortBy });
    }

    renderFavouritesList({ items }) {
        return (
            <List items={items} 
                  renderBy={this.FavouritesRenderBy} 
                  useKey="stopId" 
                  onItemClick={this.onFavouriteClicked} />
        );    
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

        const sortBy = (
            <Select onChange={this.onSortingChanged} inline right>
                    <option value="">Sort By</option>
                    <option value={NEWEST_FIRST}>Newest First</option>
                    <option value={OLDEST_FIRST}>Oldest First</option>
                    <option value={ALPHA_SORT}>A-Z</option>
            </Select>
        );
        const hasMoreThanLimit = this.state.favourites.length > LIMITED_MAX_TO_DISPLAY; 
        
        if (this.props.displayAll) {
            return (
                <div>
                    <TitleContainer>Favourites</TitleContainer>
                    {sortBy}
                    <Pager items={this.state.favourites} 
                       renderBy={this.renderFavouritesList}
                       itemsPerPage={DISPLAY_ALL_MAX_TO_DISPLAY} /> 
                </div>   
            );
        }

        
        const limited = hasMoreThanLimit 
            ? this.state.favourites.slice(0, LIMITED_MAX_TO_DISPLAY)
            : this.state.favourites;
        return (
            <Container>
                <TitleContainer>Favourites</TitleContainer>
                {hasMoreThanLimit && sortBy}
                {this.renderFavouritesList({ items: limited })}
                {hasMoreThanLimit && <Button link right onClick={this.onViewAllFavouritesClicked}>View All Favourites</Button>}
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