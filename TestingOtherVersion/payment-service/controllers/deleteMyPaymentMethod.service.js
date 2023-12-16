const httpStatus = require('http-status-codes').StatusCodes;
const { db } = require('../startup/firebase');

const deleteMyPaymentMethod = async (req, res) => {
  const paymentMethodRef = await db
    .collection(process.env.PAYMENT_METHODS_DOC)
    .where('userId', '==', req.user.id)
    .limit(1)
    .get();

  if (paymentMethodRef.empty) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ error: 'Payment method not found' });
  }

  const paymentMethodDocRef = paymentMethodRef.docs[0].ref;
  const paymentMethodDoc = await paymentMethodDocRef.get();

  await db
    .collection(process.env.PAYMENT_METHODS_DOC)
    .doc(paymentMethodDoc.id)
    .delete();

  res.status(httpStatus.NO_CONTENT).end();
};

module.exports = deleteMyPaymentMethod;
