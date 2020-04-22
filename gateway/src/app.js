const express = require('express');
const axios = require('axios');

const app = express();
const port = 80;

const fetch = async url => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

app.route('/').get((req, res) => res.json({ service: 'gateway' }));

app.route('/basket').get(async (req, res) => res.json(await fetch('http://basket')));

app.route('/catalog').get(async (req, res) => res.json(await fetch('http://catalog')));
app.route('/catalog/stock').get(async (req, res) => res.json(await fetch('http://catalog/stock')));

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
