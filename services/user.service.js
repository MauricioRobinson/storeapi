const faker = require('faker');

class UserServices {
  constructor() {
    this.users = [];
    this.generator();
  }

  generator() {
    const limit = 50;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      });
    }
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 3000);
    });
  }

  async findOne(id) {
    return this.users.find((item) => item.id === id);
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);

    return newUser;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Error: The users cannot be updated');
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };

    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Error: The user cannot be deleted');
    }

    this.users.splice(index, 1);

    return {
      message: 'The user have been deleted',
      id,
    };
  }
}

module.exports = UserServices;
