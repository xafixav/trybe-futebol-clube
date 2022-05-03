import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'any.required': '401|All fields must be filled',
      'any.invalid': '401|Incorrect email or password',
      'string.email': '401|Incorrect email or password',
    }),
  password: Joi.string().min(6).required().messages({
    'any.required': '400|All fields must be filled',
    'string.base': '422|Password must be a string',
    'string.min': '400|All fields must be filled',
  }),
});

export default loginSchema;
