const express = require('express')

const app = express();
const port = 80;

app.route('/').get((req, res) => res.json({ service: 'basket' }));

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
