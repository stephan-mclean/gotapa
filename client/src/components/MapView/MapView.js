import React from 'react';
import Map from 'pigeon-maps';

const DEFAULT_CENTER = { latitude: 53.3498, longitude: -6.2603 };

class MapView extends React.Component {

    constructor(props) {
        super(props);

        this.state = { center: Object.values(DEFAULT_CENTER) }
    }

    onBoundsChanged({ bounds }) {
        const northWestBound = {
            latitude: bounds.nw[0],
            longitude: bounds.nw[1]
        };

        const northEastBound = {
            latitude: bounds.ne[0],
            longitude: bounds.ne[1]
        };

        const southWestBound = {
            latitude: bounds.sw[0],
            longitude: bounds.sw[1]
        };

        const southEastBound = {
            latitude: bounds.se[0],
            longitude: bounds.se[1]
        };

        console.log('bounds', northEastBound, southWestBound);

    }

    render() {

        return (

            <div>
                <Map onBoundsChanged={this.onBoundsChanged} defaultCenter={this.state.center} zoom={14} height={400} />
            </div>

        );

    }

};

export default MapView; 