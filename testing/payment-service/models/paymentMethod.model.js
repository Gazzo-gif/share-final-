const Joi = require('joi');

function validatePaymentMethod(paymentMethod) {
  const paymentInfoSchema = Joi.object({
    cardNumber: Joi.string().required(),
    cardHolderName: Joi.string().required(),
    expirationDate: Joi.string()
      .pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
      .required(),
    cvv: Joi.string()
      .pattern(/^\d{3,4}$/)
      .required(),
  });

  return paymentInfoSchema.validate(paymentMethod);
}

module.exports = validatePaymentMethod;
