const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ProductServices {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
    }

      const { limit, offset } = query;
      if(limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const updateProduct = await product.update(changes);
    return updateProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductServices;
