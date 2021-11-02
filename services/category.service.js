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

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 5000);
    });
  }

  async findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Error: Category cannot be changed');
    }

    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };

    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Error: Category cannot be changed');
    }

    this.categories.splice(index, 1);

    return {
      message: 'The category have been deleted',
      id,
    };
  }
}

module.exports = CategoryServices;
