const Joi = require('joi');

const id = Joi.number().integer();
const password = Joi.string().min(8);
const email = Joi.string().email();
// const rol = Joi.string().min(5);

const createUserSchema = Joi.object({
  password: password.required(),
  email: email.required(),
  // rol: rol.required(),
});

const updateUserSchema = Joi.object({
  password,
  email,
  // rol,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
