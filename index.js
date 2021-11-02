const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world from Express');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'Product 2',
      price: 2000,
    },
  ]);
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
  res.json([
    {
      name: 'User1',
    },
    {
      name: 'User2',
    },
  ]);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
  });
});

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});
