const express = require('express');
const axios = require('axios');

const app = express();
const port = 80;

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
app.route('/catalog/stock').get(async (req, res) => res.json(await fetch('http://catalog/stock')));

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
