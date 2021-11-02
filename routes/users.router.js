const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 20;

  for (let index = 0; index < limit; index++) {
    users.push({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }

  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (id === '999') {
    res.status(404).json({
      message: 'Not found',
    });
  } else {
    res.status(200).json({
      id,
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
