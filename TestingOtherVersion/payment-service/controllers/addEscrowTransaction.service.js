const httpStatus = require('http-status-codes').StatusCodes;
const validateEscrowTransaction = require('../models/escrowTransaction.model');
const updateBalance = require('./updateBalance.service');

const addEscrowTransaction = async (req, res, database) => {
  const { requestId, lenderId, borrowerId, amount } = req.body;

  const { error } = validateEscrowTransaction(req.body);

  if (error) {
    console.warn(`Invalid escrow transaction data format: ${error}`);
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: `Invalid escrow transaction data format: ${error}` });
  }

  const updateStatus = await updateBalance(
    borrowerId,
    amount * -1,
    database
  );

  if (updateStatus.status == false) {
    console.warn(updateStatus.error);
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: updateStatus.error });
  }

  const newEscrowTransactionRef = await database
    .collection(process.env.ESCROW_TRANSACTIONS_DOC)
    .add({
      requestId,
      lenderId,
      borrowerId,
      amount,
      status: process.env.ESCROW_HELD_STATUS,
    });

  const escrowTransaction = {
    id: newEscrowTransactionRef.id,
    requestId: requestId,
    lenderId: lenderId,
    borrowerId: borrowerId,
    amount: amount,
    status: process.env.ESCROW_HELD_STATUS,
  };

  res.status(httpStatus.CREATED).json({
    message: 'Escrow transaction added successfully',
    escrowTransaction: escrowTransaction,
  });
};

module.exports = addEscrowTransaction;
