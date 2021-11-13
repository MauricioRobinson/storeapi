const express = require('express');
const router = express.Router();

const OrderServices = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
} = require('./../schemas/order.schema');
const service = new OrderServices();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);

      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteOrder = await service.delete(id);
    res.json(deleteOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
