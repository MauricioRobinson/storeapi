const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CustomerServices {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }

    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const updatedCustomer = await customer.update(changes);

    return updatedCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return {
      id,
    };
  }
}

module.exports = CustomerServices;
