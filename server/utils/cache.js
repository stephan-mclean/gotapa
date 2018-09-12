const apicache = require('apicache');
const redis = require('redis');

let cache; 

if (process.env.NODE_ENV === 'production') {
    console.log('======= CACHE WITH REDIS =========');
    cache = apicache
                .options({ redisClient: redis.createClient() })
                .middleware; 
} else {
    cache = apicache.middleware; 
}

module.exports = cache; 