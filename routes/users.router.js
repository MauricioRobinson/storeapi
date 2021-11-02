const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay query params');
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
  });
});


module.exports = router;
