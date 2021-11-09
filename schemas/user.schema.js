const Joi = require('joi');

const id = Joi.number().integer();
const password = Joi.string().min(8);
const email = Joi.string().email();
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  password: password.required(),
  email: email.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  password,
  email,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
