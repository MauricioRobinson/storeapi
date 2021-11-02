const faker = require('faker');

class CategoryServices {
  constructor() {
    this.categories = [];
    this.generator();
  }

  generator() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        category: faker.commerce.product(),
      });
    }
  }

  find(){
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  create() {}

  update(){}

  delete(){}
}

module.exports = CategoryServices;
