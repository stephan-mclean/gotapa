const axios = require('axios');
const API_BASE_URL = require('../utils/api').API_BASE_URL;
const stopsUtil = require('../utils/stops');

const RecentlyViewedStop = require('../models/recentlyviewedstop');

exports.getStop = async (req, res) => {
    res.send(await stopsUtil.getStop(req.params.id));
};

exports.getStopRealtimeInfo = async (req, res) => {
    res.send((await axios.get(`${API_BASE_URL}/realtimebusinformation?stopid=${req.params.id}&format=json`)).data);
};

exports.addRecentlyViewedStop = (req, res) => {
    const stopToAdd = new RecentlyViewedStop({
        stopid: req.params.id
    });

    stopToAdd.save(err => {
        if (err) {
            throw new Error('Could not add recently viewed stop');
        }

        res.send('Success');
    });
};