const express = require('express');
const router = express.Router(); 
const cache = require('../utils/cache').cache;

const stopsController = require('../controllers/stops');
const asyncMiddleware = require('../utils/asyncMiddleware');

router.get('/:id', cache('1 day'), asyncMiddleware(stopsController.getStop));
router.get('/:id/realtimeinfo', cache('1 minutes'), asyncMiddleware(stopsController.getStopRealtimeInfo));
router.post('/:id/addrecentlyviewed', stopsController.addRecentlyViewedStop);

module.exports = router; 