const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const recentlyViewedStopSchema = new Schema({
    stopid: String,
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RecentlyViewedStop', recentlyViewedStopSchema);