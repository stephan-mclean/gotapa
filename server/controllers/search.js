const Fuse = require('fuse.js');
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