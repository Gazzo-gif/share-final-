const httpStatus = require('http-status-codes').StatusCodes;
const { db } = require('../startup/firebase');

const updateMyPaymentMethod = async (req, res) => {
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

  await paymentMethodDocRef.update(req.body);

  const updatedPaymentMethodDoc = await paymentMethodDocRef.get();
  const updatedPaymentMethodData = updatedPaymentMethodDoc.data();

  res
    .status(httpStatus.OK)
    .json({ id: updatedPaymentMethodDoc.id, ...updatedPaymentMethodData });
};

module.exports = updateMyPaymentMethod;
