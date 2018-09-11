const express = require('express');
const router = express.Router(); 
const apicache = require('apicache');
const cache = apicache.middleware;

const searchController = require('../controllers/search');
const asyncMiddleware = require('../utils/asyncMiddleware');

const paginate = (req, res) => {
    const results = res.locals.results; 
    const { limit, page } = req.query;

    if (limit > 0 && results.length > limit) {

        const startIndex = (page - 1) * limit; 
        const endIndex = page * limit; 

        const pagedResponse = results.slice(startIndex, endIndex);
        res.send({
            numberOfResults: results.length,
            results: pagedResponse
        });
    } 
};

router.get('/stops', cache('1 day'), asyncMiddleware(searchController.searchStops), paginate);

module.exports = router; 