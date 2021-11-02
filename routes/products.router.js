const express = require('express');
const router = express.Router();

const ProductServices = require('./../services/product.service');
const service = new ProductServices();

router.get('/', (req, res) => {
  const products = service.find();

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Hola, soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);

  if (id) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      message: 'Not found',
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'partial update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
