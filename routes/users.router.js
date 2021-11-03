const express = require('express');
const router = express.Router();

const UserServices = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');
const service = new UserServices();

router.get('/', async (req, res) => {
  const users = await service.find();

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({
      message: 'Not users found',
    });
  }
});

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);

  if (id) {
    res.status(200).json(user);
  } else {
    res.status(400).json({
      message: 'User not found',
    });
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res) => {
  const body = req.body;
  const createUser = await service.create(body);

  res.status(201).json(createUser);
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateUser = await service.update(id, body);

    res.status(200).json(updateUser);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.delete('/:id', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await service.delete(id);

    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

module.exports = router;
