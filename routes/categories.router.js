const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    categories.push({
      category: faker.commerce.product(),
    });
  }

  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (id === '999') {
    res.status(404).json({
      message: 'Not found',
    });
  } else {
    res.json({
      id,
    });
  }
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'Category created',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    id,
    message: 'Category updated',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    id,
    message: 'Category updated',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    id,
    message: 'Partialy category updated',
    data: body,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    message: 'Category deleted',
  });
});

module.exports = router;
