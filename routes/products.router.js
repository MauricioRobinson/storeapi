const express = require('express');
const router = express.Router();

const ProductServices = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');
const service = new ProductServices();

router.get('/', async (req, res) => {
  const products = await service.find();

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Hola, soy un filter');
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  if (newProduct) {
    res.status(201).json(newProduct);
  } else {
    res.status(404).json({
      message: 'Error: product cannot be created',
      data: newProduct,
    });
  }
});

router.patch('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateProduct = await service.update(id, body);

    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await service.delete(id);

  if (id) {
    res.status(200).json(deleteProduct);
  } else {
    res.status(404).json({
      message: 'Product not found',
      id,
    });
  }

  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
