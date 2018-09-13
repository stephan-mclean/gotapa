import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import List from '../platform/List';
import RealTimeResult from '../RealTimeResult/RealTimeResult';
import RealTimeEntryModel from '../../models/RealTimeEntry';
import Loading from '../Loading/Loading';
import IconMessage from '../IconMessage/IconMessage';

const CustomList = styled(List)`
    border: none; 
`;

const RealTimeListItem = ({ item }) => (
    <RealTimeResult {...item} />
);

const RefreshContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-end;
    padding: 1rem; 
    padding-bottom: 0; 
`

class RealTimeResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = { results: [], loading: false };
        this.loadResults = this.loadResults.bind(this);
    }

    loadResults() {
        const { stopId } = this.props; 

        this.setState({ loading: true });
        fetch(`/api/stops/${stopId}/realtimeinfo`)
            .then(response => response.json())
            .then(data => this.setState({ results: data.results.map(result => new RealTimeEntryModel(result)), loading: false }));
    }

    componentDidMount() {
        this.loadResults(); 
    }

    render() {

        const refreshIcon = <RefreshContainer><FontAwesomeIcon onClick={this.loadResults} icon="sync" /></RefreshContainer>
        if (this.state.loading) {
            return (
                <Loading message="Loading real time results..."/>
            );
        } else if (this.state.results && this.state.results.length) {
            return (
                <div>
                    {refreshIcon}
                    <CustomList items={this.state.results} renderBy={RealTimeListItem} />
                </div>
            );
        } else {
            return (
                <div>
                    {refreshIcon}
                    <IconMessage icon="exclamation-triangle" message="No real time results found." />
                </div>
            );
        }

    }

};

RealTimeResults.propTypes = {
    stopId: PropTypes.string.isRequired
};

export default RealTimeResults; 