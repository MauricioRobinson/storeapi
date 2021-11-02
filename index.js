const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world from Express');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      napriceme: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: 'Product 2',
    price: 2000,
  });
});

app.get('/categories', (req, res) => {
  res.json([
    {
      category: 'category1',
    },
    {
      category: 'category2',
    },
    {
      category: 'category3',
    },
  ]);
});

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay query params');
  }
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
  });
});

app.listen(port, () => {
  console.log('Server running on port: ' + port + ' 👍');
});
