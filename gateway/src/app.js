const express = require('express');
const axios = require('axios');

const app = express();
const port = 80;
app.use(express.json());

app.route('/').get((req, res) => res.json({ service: 'gateway' }));

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
