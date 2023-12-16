const httpStatus = require('http-status-codes').StatusCodes;
const updateBalance = require('./updateBalance.service');

const updateEscrowTransaction = async (req, res, database) => {
    const escrowTransactionId = req.params.id;
    const { status } = req.body;
    if (
      status != process.env.ESCROW_RELEASED_STATUS &&
      status != process.env.ESCROW_REFUNDED_STATUS
    ) {
      console.warn('Invalid status');
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'Invalid status' });
    }

    const transactionRef = database.collection(process.env.ESCROW_TRANSACTIONS_DOC).doc(escrowTransactionId);
    const transactionDoc = await transactionRef.get();

    if (!transactionDoc.exists) {
      console.warn('Escrow transaction not found');
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: 'Escrow transaction not found' });
    }

    const currentStatus = transactionDoc.data().status;

    if (currentStatus != process.env.ESCROW_HELD_STATUS) {
      console.warn('Escrow transaction status is not "held". Update not allowed.');
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'Escrow transaction status is not "held". Update not allowed.' });
    }

    await transactionRef.update(req.body);

    const updatedEscrowTransactionDoc = await transactionRef.get();
    const updatedEscrowTransactionData = updatedEscrowTransactionDoc.data();

    const userIdToUpdate = (status == process.env.ESCROW_RELEASED_STATUS) ?
      updatedEscrowTransactionData.borrowerId :
      updatedEscrowTransactionData.lenderId;
    
    const updateStatus = await updateBalance(
      userIdToUpdate,
      updatedEscrowTransactionData.amount,
      database
    );

    if (!updateStatus.status) {
      console.warn(updateStatus.error);
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: updateStatus.error });
    }

    res
      .status(httpStatus.OK)
      .json({ id: escrowTransactionId, ...updatedEscrowTransactionData });
  };

  module.exports = updateEscrowTransaction;