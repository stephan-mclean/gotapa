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

                    <Tab>
                        <TabHeading>Real time results</TabHeading>

                        <TabBody>
                            <RealTimeResults stopId={this.state.stopId} />
                        </TabBody>
                    </Tab>

                    <Tab>
                        <TabHeading>Map</TabHeading>

                        <TabBody>{mapToShow}</TabBody>
                    </Tab>

                </TabSet>
            </div>
        );

    }

}

export default Stop; 