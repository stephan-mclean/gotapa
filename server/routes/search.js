const express = require('express');
const router = express.Router(); 

const cache = require('../utils/cache').cache;
const searchController = require('../controllers/search');
const asyncMiddleware = require('../utils/asyncMiddleware');

const paginate = (req, res) => {
    const results = res.locals.results; 
    const { limit, page } = req.query;

    if (limit < 1) {
        throw new Error('Invalid query limit', limit);
    }

    let finalResults = results; 
    if (results.length > limit) {
        const startIndex = (page - 1) * limit; 
        const endIndex = page * limit; 
        finalResults = results.slice(startIndex, endIndex);
    }
        
    res.send({
        numberOfResults: results.length,
        results: finalResults
    });
};

router.get('/stops', cache('8 hours'), asyncMiddleware(searchController.searchStops), paginate);
router.get('/nearby', cache('15 minutes'), asyncMiddleware(searchController.searchNearbyStops));
router.get('/inbounds', asyncMiddleware(searchController.searchWithinBounds));

module.exports = router; 