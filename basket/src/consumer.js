const amqplib = require('amqplib');
const cache = require('./cache');

const queue = 'products';

const getChannel = async () => {
  try {
    const connection = await amqplib.connect(`amqp://${process.env.EVENT_BUS_HOST}`);
    return Promise.resolve(connection.createChannel());
  } catch (error) {
    console.error(error);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        getChannel().then(resolve).catch(reject);
      }, 1000);
    });
  }
};

module.exports = async () => {
  const channel = await getChannel();
  await channel.assertQueue(queue);
  channel.consume(queue, message => {
    if (message !== null) {
      const product = JSON.parse(message.content.toString());
      console.log(`Consumed product ${product._id}`);
      cache.set(product._id, JSON.stringify(product));
      channel.ack(message);
    }
  });
};
