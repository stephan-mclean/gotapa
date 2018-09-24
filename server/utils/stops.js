const axios = require('axios');
const API_BASE_URL = require('../utils/api').API_BASE_URL;
const StopsCache = require('./stopcache');

const cache = new StopsCache();  

let callInProgressPromise; 

const getAllStops = async () => {

    const cached = cache.getCachedStops();  

    if (cached) {
        console.log('returning cached');
        return cached; 
    }

    if (callInProgressPromise) {
        console.log('call in progress - waiting');
        return callInProgressPromise.then(result => result, error => { throw new Error(error); } );
    }

    console.log('no call in progress - setting');
    callInProgressPromise = new Promise(async (resolve, reject) => {

        try {
            const stops = (await axios.get(`${API_BASE_URL}/busstopinformation?stopid&format=json`)).data.results;
            cache.setCachedStops(stops); 
            console.log('call in progress - resolving');
            resolve(stops);
        } catch (err) {
            reject(error); 
        }
    });

    console.log('returning new call');
    return callInProgressPromise.then(result => result, error => { throw new Error(error); } );

};

// Preload
getAllStops(); 

exports.getAllStops = getAllStops; 

exports.getStop = async id => {
    const stops =  await getAllStops(); 
    const theStop = stops.find(stop => stop.stopid === id);

    if (!theStop) {
        throw new Error(`Could not find stop: ${id}`);
    }

    return theStop
};
