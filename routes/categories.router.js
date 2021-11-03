const express = require('express');
const router = express.Router();

const CategoryServices = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./../schemas/category.schema');
const service = new CategoryServices();

router.get('/', async (req, res) => {
  const categories = await service.find();

  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({
      message: 'Category not found',
    });
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const category = await service.findOne(id);

    if (id) {
      res.status(200).json(category);
    } else {
      res.status(404).json({
        id,
        message: 'Category not found',
      });
    }
  }
);

router.get(
  '/:categoryId/products/:productId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    const { categoryId, productId } = req.params;

    res.json({
      categoryId,
      productId,
    });
  }
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const createCategory = await service.create(body);

    res.status(201).json(createCategory);
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCategory = await service.update(id, body);

      res.status(200).json(updateCategory);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await service.delete(id);

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

module.exports = router;
