const amqplib = require('amqplib');
const queue = 'tasks';

const getChannel = async () => {
  const connection = await amqplib.connect(`amqp://${process.env.EVENT_BUS_HOST}`);
  return Promise.resolve(connection.createChannel());
};

// Publisher
getChannel().then(async channel => {
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from('something to do'));
}).catch(console.warn);

// Consumer
getChannel().then(async channel => {
  await channel.assertQueue(queue);
  channel.consume(queue, msg => {
    if (msg !== null) {
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  });
}).catch(console.warn);
