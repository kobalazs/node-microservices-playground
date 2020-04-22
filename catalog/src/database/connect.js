const { MongoClient } = require('mongodb');

module.exports = callback => MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async (client) => {
    const db = client.db();
    await callback(db);
    client.close();
  })
  .catch((error) => {
    throw error;
  });
