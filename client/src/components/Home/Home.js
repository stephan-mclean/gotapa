import React from 'react';
import StopSearch from '../StopSearch/StopSearch';
import NearbyLocations from '../NearbyLocations/NearbyLocations';
import Favourites from '../Favourites/Favourites';

export default () => (
    <div>
        <StopSearch />
        <Favourites />
        <NearbyLocations />
    </div>
);