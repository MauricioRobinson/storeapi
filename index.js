const express = require('express');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const port = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world from Express');
});

routerApi(app);

//Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running on port: ' + port + ' 👍');
});
