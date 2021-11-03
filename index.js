const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido'));
    }
  },
};
app.use(cors(options));

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
