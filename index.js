const express = require('express');
const app = express();
const routerApi = require('./routes');
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world from Express');
});

routerApi(app);

app.listen(port, () => {
  console.log('Server running on port: ' + port + ' 👍');
});
