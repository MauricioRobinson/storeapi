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

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find((item) => item.id === id);
  }

  create() {}

  update() {}

  delete() {}
}

module.exports = UserServices;
