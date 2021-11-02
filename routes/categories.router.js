const express = require('express');
const router = express.Router();

const CategoryServices = require('./../services/category.service');
const service = new CategoryServices();

router.get('/', (req, res) => {
  const categories = service.find();

  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({
      message: 'Category not found',
    });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);

  if (id) {
    res.status(200).json(category);
  } else {
    res.status(404).json({
      id,
      message: 'Category not found'
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
