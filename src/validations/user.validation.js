import Joi from 'joi';

export const createUser = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
  name: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.string().required(),
  address: Joi.string().required(),
  cmnd_number: Joi.number().required(),
  salary: Joi.number().required(),
  manager_id: Joi.number(),
  status: Joi.number().required(),
  roles: Joi.array().required().items(Joi.string().required().valid(
    'user', 'admin', 'manager', 'accountant', 'employee')
  )
});