const connectDb = require('./database/connect');
const express = require('express');

const app = express();
const port = 80;

app.route('/').get((req, res) => res.json({ service: 'catalog' }));
app.route('/stock').get(async (req, res) => {
  connectDb(async (db) => {
    const stock = await db.collection('stock').find({}).toArray()
    res.json(stock);
  });
});

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
