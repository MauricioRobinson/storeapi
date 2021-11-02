const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      category: 'category1',
    },
    {
      category: 'category2',
    },
    {
      category: 'category3',
    },
  ]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
  });
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
  });
});


module.exports = router;
