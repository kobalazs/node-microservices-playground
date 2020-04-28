const express = require('express');
const axios = require('axios');

const app = express();
const port = 80;
app.use(express.json());

const fetch = async (url, method, data) => {
  try {
    const res = await axios.request({ url, method: method || 'get', data });
    return res.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

app.route('/').get((req, res) => res.json({ service: 'gateway' }));

app.route('/basket').get(async (req, res) => res.json(await fetch('http://basket')));
app.route('/basket/add/:id').post(
  async (req, res) => res.json(await fetch(`http://basket/add/${req.params.id}`, 'post'))
);
app.route('/basket/show').get(
  async (req, res) => res.json(await fetch('http://basket/show'))
);
app.route('/basket/clear').delete(
  async (req, res) => res.json(await fetch('http://basket/clear', 'delete'))
);

app.route('/catalog').get(async (req, res) => res.json(await fetch('http://catalog')));
app.route('/catalog/product').get(async (req, res) => res.json(await fetch('http://catalog/product')));
app.route('/catalog/product/:id').get(
  async (req, res) => res.json(await fetch(`http://catalog/product/${req.params.id}`))
);
app.route('/catalog/product/:id').patch(
  async (req, res) => res.json(await fetch(`http://catalog/product/${req.params.id}`, 'patch', req.body))
);

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
