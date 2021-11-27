const express = require('express');
const router = express.Router();
const passport = require('passport');

const OrderServices = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const {
  addItemSchema,
  createOrderSchema,
  getOrderSchema,
} = require('./../schemas/order.schema');
const service = new OrderServices();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  passport.authenticate('jwt', { session: false }),
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

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteOrder = await service.delete(id);
      res.json(deleteOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
