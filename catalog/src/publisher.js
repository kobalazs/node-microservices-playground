const amqplib = require('amqplib');

const queue = 'products';

const getChannel = async () => {
  const connection = await amqplib.connect(process.env.EVENT_BUS_URL);
  return Promise.resolve(connection.createChannel());
};

module.exports = product => new Promise(async (resolve, reject) => {
  try {
    const channel = await getChannel();
    await channel.assertQueue(queue);
    const message = Buffer.from(JSON.stringify(product));
    channel.sendToQueue(queue, message);
    console.log(`Published product ${product._id}`);
    resolve();
  } catch (error) {
    reject(error);
  }
});
