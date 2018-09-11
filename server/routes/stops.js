const express = require('express');
const router = express.Router(); 
const apicache = require('apicache');
const cache = apicache.middleware;

const stopsController = require('../controllers/stops');
const asyncMiddleware = require('../utils/asyncMiddleware');

router.get('/:id', cache('1 day'), asyncMiddleware(stopsController.getStop));
router.get('/:id/realtimeinfo', cache('1 minutes'), asyncMiddleware(stopsController.getStopRealtimeInfo));
router.post('/:id/addrecentlyviewed', stopsController.addRecentlyViewedStop);

module.exports = router; 