const express = require('express');
const router = express.Router();
const passport = require('passport');

const OrderServices = require('./../services/order.service');
const service = new OrderServices();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
