const amqplib = require('amqplib');

const queueName = 'products';

const getChannel = async () => {
  const connection = await amqplib.connect(process.env.EVENT_BUS_URL);
  return Promise.resolve(connection.createChannel());
};

module.exports = async product => {
  const channel = await getChannel();
  await channel.assertQueue(queueName);
  const message = Buffer.from(JSON.stringify(product));
  channel.sendToQueue(queueName, message);
  console.log(`Published product ${product._id}`);
};
