const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthService = require('./../services/auth.service');
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const signToken = await service.signToken(user);
      res.json(signToken);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const mail = await service.sendRecovery(email);
    res.json(mail);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
