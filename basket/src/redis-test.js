const redis = require('redis');
const client = redis.createClient({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT
});

client.on('error', function(error) {
  console.error(error);
});

client.set('key', 'value');
client.get('key', (err, reply) => {
  console.log(reply);
});
