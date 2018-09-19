import React from 'react';
import { withRouter } from 'react-router-dom';

import Typeahead from '../Typeahead/Typeahead';
import List from '../platform/List';
import IconInput from '../platform/IconInput';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';

const RenderedStopInfo = props => {
    return (
        <li {...props}><StopInfo {...props.item} /></li>
    );
};

const TypeaheadRenderBy = props => (
    <List {...props} renderBy={RenderedStopInfo} useKey="stopId"></List>
);

class StopSearch extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            currentSearchFn: null,
            loading: false
        };

        this.onSearchValueChange = this.onSearchValueChange.bind(this);
        this.onSearchResultSelected = this.onSearchResultSelected.bind(this);

        this.typeaheadRenderSearchBy = props => (
            <IconInput id="stopSearchInput" {...props} icon="spinner" spin hideIcon={!this.state.loading} />
        );
    } 

    onSearchValueChange(e) {

        if (this.state.currentSearchFn) {
            clearTimeout(this.state.currentSearchFn);
        }

        let searchValue = e.target.value; 

        searchValue = searchValue.trim ? searchValue.trim() : searchValue; 
        if (searchValue) {
            searchValue = searchValue.toLowerCase ? searchValue.toLowerCase() : searchValue; 
            const searchFn = setTimeout(() => {
            
                this.setState({ loading: true });
                fetch(`/api/search/stops?search=${searchValue}&limit=10&page=1`)
                    .then(response => response.json())
                    .then(data => {
                        const mappedResults = data.results.map(stop => new StopModel(stop));
                        this.setState({ searchResults: mappedResults, loading: false });
                    })
                    .catch(err => this.setState({ loading: false }))
    
            }, 500);
    
            this.setState({ currentSearchFn: searchFn });
        }
    }

    onSearchResultSelected(item) {
        this.props.history.push(`/stops/${item.stopId}`);
    }

    render() {

        return (
            <Typeahead  label="Search for a location" 
                        placeholder="e.g Heuston Station..." 
                        onChange={this.onSearchValueChange} 
                        options={this.state.searchResults} 
                        onOptionSelected={this.onSearchResultSelected} 
                        renderOptionsBy={TypeaheadRenderBy} renderSearchBy={this.typeaheadRenderSearchBy} />
        )

    }

}; 

export default withRouter(StopSearch); 