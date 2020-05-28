const { MongoClient } = require('mongodb');

module.exports = async () => {
  const connection = await MongoClient.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return connection.db();
};
