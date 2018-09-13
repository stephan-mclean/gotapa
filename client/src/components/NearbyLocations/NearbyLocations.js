import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import List from '../platform/List';
import StopInfo from '../StopInfo/StopInfo';
import StopModel from '../../models/Stop';
import Loading from '../Loading/Loading';
import IconMessage from '../IconMessage/IconMessage';
import InfoMessage from '../InfoMessage/InfoMessage';
import Button from '../platform/Button';

const TitleContainer = styled.label`
    display: block; 
    font-weight: bold; 
    margin-top: 0.5rem; 
`;

const LocationsRenderBy = ({ ...otherProps, item }) => {
    return (
        <li {...otherProps}><StopInfo {...item} /></li>
    );
};

// TODO: Deal with if user declines permission. 
// TODO: Deal with if position can't be found. 
class NearbyLocations extends React.Component {

    constructor(props) {
        super(props);

        this.state = { locations: [], loading: false, geolocationAllowed: false, geolocationSupported: !!navigator.geolocation };
        this.tryToEnableLocation = this.tryToEnableLocation.bind(this);
        this.onLocationClicked = this.onLocationClicked.bind(this);
    }

    componentDidMount() {

        if(this.state.geolocationSupported) {
            if (navigator.permissions) {
                navigator.permissions.query({ name: 'geolocation'})
                    .then(permission => {
                        if (permission.state === 'granted') {
                            this.tryToEnableLocation(); 
                        }
                    });
            }
        }

    }

    tryToEnableLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ geolocationAllowed: true, loading: true });
            const { latitude, longitude } = position.coords; 
            fetch(`/api/search/nearby?latitude=${latitude}&longitude=${longitude}&limit=5`)
                .then(response => response.json())
                .then(data => {
                    const mappedLocations = data.map(stop => new StopModel(stop));
                    this.setState({ locations: mappedLocations, loading: false });
                });
        });
    }

    onLocationClicked(item) {
        this.props.history.push(`/stops/${item.stopId}`);
    }

    render() {

        if (!this.state.geolocationSupported) {
            return null; 
        }

        const title = <TitleContainer>Nearby Locations</TitleContainer>;
        if (!this.state.geolocationAllowed) {
            return (
                <div>
                    {title}
                    <InfoMessage>You need to <Button onClick={this.tryToEnableLocation} link>enable location services</Button> to show nearby locations.</InfoMessage>
                </div>
            );
        } else if (this.state.loading) {
            return (
                <div>
                    {title}
                    <Loading message="Loading nearby locations..." />
                </div>
            );
        } else if(this.state.locations && this.state.locations.length) {
            return (
                <div>
                    {title}
                    <List items={this.state.locations} 
                          renderBy={LocationsRenderBy} 
                          useKey="stopId" onItemClick={this.onLocationClicked} />
                </div>
            );
        } else {
            return (
                <div>
                    {title}
                    <IconMessage icon="exclamation-triangle" message="No nearby locations found." />
                </div>
            );
        }

    }

};

export default withRouter(NearbyLocations); 