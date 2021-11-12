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

router.get('/', async (req, res, next) => {
  try {
    const categories = service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
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
  async (req, res, next) => {
    try {
      const body = req.body;
      const createCategory = await service.create(body);
      res.status(201).json(createCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateCategory = await service.update(id, body);

      res.json(updateCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategory = await service.delete(id);
    res.json(deleteCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
