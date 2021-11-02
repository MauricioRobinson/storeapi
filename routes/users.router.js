const express = require('express');
const router = express.Router();

const UserServices = require('./../services/user.service');
const service = new UserServices();

router.get('/', (req, res) => {
  const users = service.find();

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({
      message: 'Not users found',
    });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);

  if (id) {
    res.status(200).json(user);
  } else {
    res.status(240400).json({
      message: 'User not found',
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'User created',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'Updated user',
    data: body,
    id,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'Updated partial user',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'Deleted user',
    id,
  });
});

module.exports = router;
