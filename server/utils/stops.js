const axios = require('axios');
const API_BASE_URL = require('../utils/api').API_BASE_URL;

let stops; 

const getAllStops = async () => {
    console.log('getAllStops');
    if (stops) {
        console.log('returning cached stops');
        return stops; 
    }

    try {
        console.log('calling api');
        stops = (await axios.get(`${API_BASE_URL}/busstopinformation?stopid&format=json`)).data.results; 
        return stops;
    } catch (err) {
        console.error(err);
    }
};

exports.getAllStops = getAllStops; 

exports.getStop = async id => {

    if (!stops) {
        await getAllStops(); 
    }
    
    return stops.find(stop => stop.stopid === id);
};
