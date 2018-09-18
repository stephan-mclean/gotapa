const redis = require('./cache').redisClient; 
const ALL_STOPS_KEY = '_SIMPLI_ALL_STOPS';
const ONE_MINUTE = 60; 
const ONE_HOUR = ONE_MINUTE * 60; 
const ONE_DAY = ONE_HOUR * 24; 

function StopsCache() {
    this.stops = null;
};

StopsCache.prototype.getCachedStops = function() {
    if (redis) {

        console.log('============ USING REDIS TO GET ALL STOPS =====================');
        try {
            redis.get(ALL_STOPS_KEY, (err, response) => {
                if (err) {
                    console.error(err);

                    // Return local cache if redis is unavailable. 
                    return this.stops; 
                }

                console.log('============ PARSING REDIS RESPONSE =====================');
                return JSON.parse(response); 
            }); 
        } catch(err) {
            console.error(err);

            // Return local cache if redis is unavailable. 
            return this.stops; 
        }

    }

    // If not in production, just use a local var. 
    return this.stops;
};

StopsCache.prototype.setCachedStops = function(stops) {

    if (redis) {
        console.log('================= SETTING ALL STOPS IN REDIS =====================');
        redis.set(ALL_STOPS_KEY, JSON.stringify(stops));
        redis.expire(ALL_STOPS_KEY, ONE_DAY); 
    }

    this.stops = stops; 
};

module.exports = StopsCache; 