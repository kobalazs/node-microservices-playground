const express = require('express');

const app = express();
const port = 80;

let basket = {};

app.route('/').get((req, res) => res.json({ service: 'basket' }));
app.route('/add/:id').post((req, res) => {
  basket[req.params.id] = {
    count: basket[req.params.id] ? basket[req.params.id].count + 1 : 1
  };
  return res.json(basket);
});
app.route('/show').get((req, res) => res.json(basket));
app.route('/clear').delete((req, res) => {
  basket = {};
  return res.json(basket);
});

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
