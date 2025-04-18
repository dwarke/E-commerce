import Joi from 'joi';

export const registerValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  
  email: Joi.string()
    .email() 
    .required(),

  password: Joi.string()
    .required(),

  address: Joi.string().min(3).max(255).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits.',
    }),

  profile: Joi.string().uri().optional(),

  genderCategory: Joi.string()
    .valid('male', 'female')
    .required(),

  role: Joi.string()
    .valid('admin'),

  token: Joi.string().optional(),
  
  resetToken: Joi.string().optional()
});
