const apicache = require('apicache');
const redis = require('redis');

let redisClient;
let cache; 

if (process.env.NODE_ENV === 'production') {
    console.log('======= CACHE WITH REDIS =========');
    redisClient = redis.createClient(process.env.REDIS_URL);
    cache = apicache
                .options({ redisClient })
                .middleware; 
} else {
    cache = apicache.middleware; 
}

exports.cache = cache; 
exports.redisClient = redisClient; 