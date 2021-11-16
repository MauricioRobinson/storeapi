const { boom } = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');
class UserServices {
  constructor() {}

  async find() {
    const user = await models.User.findAll({
      include: ['customer'],
    });
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserServices;
