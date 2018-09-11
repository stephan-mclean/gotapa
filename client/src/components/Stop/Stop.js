import React from 'react';
import RealTimeResults from '../RealTimeResults/RealTimeResults';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';

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
            stopInfoToShow = <StopInfo {...this.state.stopInfo} />
        }

        return (
            <div>
                {stopInfoToShow}

                <RealTimeResults stopId={this.state.stopId} />
            </div>
        );

    }

}

export default Stop; 