const connect = require('./connect');
const stock = require('./stock.json');

connect(async (db) => {
  const collection = db.collection('stock');
  await collection.deleteMany();
  await collection.insertMany(stock);
});
