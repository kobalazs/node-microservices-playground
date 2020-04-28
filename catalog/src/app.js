const express = require('express');
const { ObjectId } = require('mongodb');

const connectDb = require('./database/connect');

const app = express();
const port = 80;
app.use(express.json());

app.route('/').get((req, res) => res.json({ service: 'catalog' }));
app.route('/product').get(async (req, res) => {
  connectDb(async (db) => {
    const products = await db.collection('products').find({}).toArray()
    res.json(products);
  });
});
app.route('/product/:id').get(async (req, res) => {
  connectDb(async (db) => {
    const product = await db.collection('products').findOne({ _id: ObjectId(req.params.id) });
    res.json(product);
  });
});
app.route('/product/:id').patch(async (req, res) => {
  connectDb(async (db) => {
    await db.collection('products').updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    const product = await db.collection('products').findOne({ _id: ObjectId(req.params.id) });
    res.json(product);
  });
});

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
