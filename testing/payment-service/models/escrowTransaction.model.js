const Joi = require('joi');

function validateEscrowTransaction(escrowTransaction) {
  const escrowTransactionSchema = Joi.object({
    requestId: Joi.string().required(),
    lenderId: Joi.string().required(),
    borrowerId: Joi.string().required(),
    amount: Joi.number().required(),
  });

  return escrowTransactionSchema.validate(escrowTransaction);
}

module.exports = validateEscrowTransaction;
