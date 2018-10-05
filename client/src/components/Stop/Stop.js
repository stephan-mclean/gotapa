import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Map from 'pigeon-maps';
import RealTimeResults from '../RealTimeResults/RealTimeResults';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';
import { TabSet, Tab, TabHeading, TabBody } from '../TabSet/TabSet';
import IconMessage from '../IconMessage/IconMessage';
import Button from '../platform/Button';
import { event } from '../../utils/AnalyticsManager';

const STOP_ANALYTICS_CATEGORY = 'Stop';

const CustomMaker = styled(FontAwesomeIcon)`
    position: absolute; 
    top: ${props => `${props.top - 23}px`};
    left: ${props => `${props.left - 8}px`};
    font-size: 1.5rem; 
`;

const CustomMakerContainer = ({ left, top }) => <CustomMaker left={left} top={top} icon="map-pin" />

class Stop extends React.Component {

    constructor(props) {
        super(props);

        this.state = { stopInfo: null, error: false, coords: null, stopId: this.props.match.params.stopId };
        this.fetchStop = this.fetchStop.bind(this);
        this.onViewRealtimeResults = this.onViewRealtimeResults.bind(this);
        this.onViewMap = this.onViewMap.bind(this);
    }

    componentDidMount() {
        this.fetchStop(); 
    }

    fetchStop() {
        this.setState({ error: false });
        fetch(`/api/stops/${this.state.stopId}`)
            .then(response => response.json())
            .then(data => {
                const stopInfo = new StopModel(data); 
                const { latitude, longitude } = stopInfo;
                const coords = Object.values({ latitude, longitude });

                this.setState({ stopInfo, coords });
            })
            .catch(error => this.setState({ error: true }));
    }

    onViewRealtimeResults() {
        event({
            category: STOP_ANALYTICS_CATEGORY,
            action: 'Viewed real-time results',
            label: this.state.stopId
        });
    }

    onViewMap() {
        event({
            category: STOP_ANALYTICS_CATEGORY,
            action: 'Viewed map',
            label: this.state.stopId
        });
    }

    render() {
        let stopInfoToShow, mapToShow; 

        if (this.state.stopInfo) {
            stopInfoToShow = <StopInfo {...this.state.stopInfo} canUpdateFavourite={true} />; 
            mapToShow = (
                <Map center={this.state.coords} zoom={16} height={400}>
                    <CustomMakerContainer anchor={this.state.coords} />
                </Map>
            );
        }

        if (this.state.error) {

            return (
                <IconMessage icon="exclamation-triangle">Something went wrong. <Button onClick={this.fetchStop} link>Click here</Button> to retry</IconMessage>
            );

        }

        return (
            <div>
                {stopInfoToShow}

                <TabSet>

                    <Tab onActive={this.onViewRealtimeResults}>
                        <TabHeading>Real time results</TabHeading>

                        <TabBody>
                            <RealTimeResults stopId={this.state.stopId} />
                        </TabBody>
                    </Tab>

                    <Tab onActive={this.onViewMap}>
                        <TabHeading>Map</TabHeading>

                        <TabBody>{mapToShow}</TabBody>
                    </Tab>

                </TabSet>
            </div>
        );

    }

}

export default Stop; 