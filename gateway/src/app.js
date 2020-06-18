const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 80;
app.use(express.json());
app.use(cors());

const proxyTo = async (url, req, res) => {
  const serviceResponse = await axios.request({ url, method: req.method, data: req.body });
  res.json(serviceResponse.data);
};

app.route('/').get((req, res) => res.json({ service: 'gateway' }));

app.route('/basket').get((req, res) => proxyTo('http://basket', req, res));
app.route('/basket/set-item').patch((req, res) => proxyTo('http://basket/set-item', req, res));
app.route('/basket/show').get((req, res) => proxyTo('http://basket/show', req, res));
app.route('/basket/clear').delete(async (req, res) => proxyTo('http://basket/clear', req, res));

app.route('/catalog').get(async (req, res) => proxyTo('http://catalog', req, res));
app.route('/catalog/product').get(async (req, res) => proxyTo('http://catalog/product', req, res));
app.route('/catalog/product/:id').get((req, res) => proxyTo(`http://catalog/product/${req.params.id}`, req, res));
app.route('/catalog/product/:id').patch((req, res) => proxyTo(`http://catalog/product/${req.params.id}`, req, res));

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
