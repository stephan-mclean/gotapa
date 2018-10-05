import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import List from '../platform/List';
import RealTimeResult from '../RealTimeResult/RealTimeResult';
import RealTimeEntryModel from '../../models/RealTimeEntry';
import Loading from '../Loading/Loading';
import IconMessage from '../IconMessage/IconMessage';
import Button from '../platform/Button';
import { event } from '../../utils/AnalyticsManager';

const REALTIME_RESULTS_ANALYTICS_CATEGORY = 'RealTimeResults';

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

        this.state = { results: [], loading: false, error: false };
        this.loadResults = this.loadResults.bind(this);
        this.refreshResults = this.refreshResults.bind(this);
    }

    loadResults() {
        const { stopId } = this.props; 

        this.setState({ loading: true, error: false });
        fetch(`/api/stops/${stopId}/realtimeinfo`)
            .then(response => response.json())
            .then(data => this.setState({ results: data.results.map(result => new RealTimeEntryModel(result)), loading: false }))
            .catch(error => this.setState({ error: true, loading: false }));
    }

    refreshResults() {
        event({
            category: REALTIME_RESULTS_ANALYTICS_CATEGORY,
            action: 'Refreshed results',
            label: this.props.stopId
        });

        this.loadResults(); 
    }

    componentDidMount() {
        this.loadResults(); 
    }

    render() {

        const refreshIcon = <RefreshContainer><FontAwesomeIcon onClick={this.refreshResults} icon="sync" /></RefreshContainer>
        if (this.state.error) {
            return (
                <IconMessage icon="exclamation-triangle">Something went wrong loading real time results. <Button onClick={this.loadResults} link>Click here</Button> to retry.</IconMessage>
            );
        } else if (this.state.loading) {
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
                    <IconMessage icon="exclamation-triangle">No real time results found.</IconMessage>
                </div>
            );
        }

    }

};

RealTimeResults.propTypes = {
    stopId: PropTypes.string.isRequired
};

export default RealTimeResults; 