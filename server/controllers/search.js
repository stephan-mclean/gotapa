const Fuse = require('fuse.js');
const geolib = require('geolib');
const stopHelper = require('../utils/stops');

const fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        'stopid',
        'displaystopid',
        'shortname',
        'fullname'
    ]
}

exports.searchStops = async (req, res, next) => {

    const allStops = await stopHelper.getAllStops(); 
    const fuse = new Fuse(allStops, fuseOptions);
    const searchResults = fuse.search(req.query.search);

    res.locals.results = searchResults; 
    next(); 
};

exports.searchNearbyStops = async(req, res) => {
    const allStops = await stopHelper.getAllStops();   
    
    const { latitude, longitude } = req.query; 
    const limit = req.query.limit; 

    const searchResult = geolib.findNearest({ latitude, longitude }, allStops, 0, limit);

    const nearest = searchResult.map(result => {
        const stop = Object.assign({}, allStops[result.key]);
        stop.distance = result.distance; 

        return stop; 
    });

    res.send(nearest); 
};

exports.searchWithinBounds = async(req, res) => {
    const allStops = await stopHelper.getAllStops();  

    const { northWestLat, northWestLon, northEastLat, northEastLon, southWestLat, southWestLon, southEastLat, southEastLon } = req.query; 

    const bounds = [
        {
            latitude: northWestLat,
            longitude: northWestLon
        },
        {
            latitude: northEastLat,
            longitude: northEastLon
        },
        {
            latitude: southWestLat,
            longitude: southWestLon
        },
        {
            latitude: southEastLat,
            longitude: southEastLon
        }
    ];

    const stopsInBounds = allStops.map(stop => geolib.isPointInside(stop, bounds) ? stop : null).filter(n => !!n);

    res.send(stopsInBounds);
};