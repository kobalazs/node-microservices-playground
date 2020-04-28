const redis = require('redis');

const cache = redis.createClient({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT
});

cache.on('error', (error) => {
  console.error(error);
});

module.exports = cache;
