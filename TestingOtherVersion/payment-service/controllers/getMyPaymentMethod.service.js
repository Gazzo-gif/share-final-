const httpStatus = require('http-status-codes').StatusCodes;
const { db } = require('../startup/firebase');

const getMyPaymentMethod = async (req, res) => {
  const paymentMethodRef = await db
    .collection(process.env.PAYMENT_METHODS_DOC)
    .where('userId', '==', req.user.id)
    .get();

  if (paymentMethodRef.empty) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ error: 'Payment method not found' });
  }

  const paymentMethodDoc = paymentMethodRef.docs[0];
  const paymentMethodData = paymentMethodDoc.data();

  res
    .status(httpStatus.OK)
    .json({ id: paymentMethodDoc.id, ...paymentMethodData });
};

module.exports = getMyPaymentMethod;
