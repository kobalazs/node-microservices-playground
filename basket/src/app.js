const express = require('express');
const hydrator = require('./hydrator');
const consumer = require('./consumer');

const app = express();
const port = 80;

let basket = {};
consumer();

app.route('/').get((req, res) => res.json({ service: 'basket' }));

app.route('/add/:id').post((req, res) => {
  basket[req.params.id] = (basket[req.params.id] || 0) + 1;
  return res.json(basket);
});

app.route('/show').get(async (req, res) => {
  const hydratedBasket = await hydrator(basket);
  res.json(hydratedBasket)
});

app.route('/clear').delete((req, res) => {
  basket = {};
  return res.json(basket);
});

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
