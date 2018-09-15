import React from 'react';
import RealTimeResults from '../RealTimeResults/RealTimeResults';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';
import { TabSet, Tab, TabHeading, TabBody } from '../TabSet/TabSet';

class Stop extends React.Component {

    constructor(props) {
        super(props);

        this.state = { stopInfo: null, stopId: this.props.match.params.stopId };
    }

    componentDidMount() {
        fetch(`/api/stops/${this.state.stopId}`)
            .then(response => response.json())
            .then(data => this.setState({ stopInfo: new StopModel(data) }));
    }

    render() {
        let stopInfoToShow; 

        if (this.state.stopInfo) {
            stopInfoToShow = <StopInfo {...this.state.stopInfo} canUpdateFavourite={true} />
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

                        <TabBody>Google maps will go here.</TabBody>
                    </Tab>

                </TabSet>
            </div>
        );

    }

}

export default Stop; 