const Joi = require('joi');

const consultationSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  phone: Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/).required(),
  email: Joi.string().email().allow(''),
  message: Joi.string().max(2000).allow('')
});

const validateConsultation = (req, res, next) => {
  const { error } = consultationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }
  next();
};

const calculatorSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      quantity: Joi.number().min(0).required(),
      price: Joi.number().min(0).required()
    })
  ).required(),
  email: Joi.string().email().allow('')
});

const validateCalculator = (req, res, next) => {
  const { error } = calculatorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }
  next();
};

module.exports = {
  validateConsultation,
  validateCalculator
};
