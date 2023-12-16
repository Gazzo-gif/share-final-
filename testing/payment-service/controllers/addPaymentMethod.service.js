const httpStatus = require('http-status-codes').StatusCodes;
const validatePaymentMethod = require('../models/paymentMethod.model');

const addPaymentMethod = async (req, res, database) => {
  const { cardNumber, cardHolderName, expirationDate, cvv } = req.body;

  const { error } = validatePaymentMethod(req.body);

  if (error) {
    console.warn(`Invalid payment method data format: ${error}`);
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: `Invalid payment method data format: ${error}` });
  }

  const currentDate = new Date();
  const twoMonthsLater = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    2
  );

  const [expMonth, expYear] = expirationDate.split('/');
  const expirationDateObj = new Date(`20${expYear}`, expMonth - 1, 2);

  if (expirationDateObj <= twoMonthsLater) {
    console.warn(
      'Invalid expiration date. Expiry must be greater than two months.'
    );
    return res.status(httpStatus.BAD_REQUEST).json({
      error: 'Invalid expiration date. Expiry must be greater than two months.',
    });
  }

  const paymentMethodRef = await database
    .collection(process.env.PAYMENT_METHODS_DOC)
    .where('userId', '==', req.user.id)
    .get();

  if (!paymentMethodRef.empty) {
    console.warn('Payment Method is already present for this user');
    return res
      .status(httpStatus.CONFLICT)
      .json({ error: 'Payment Method is already present for this user' });
  }

  const newPaymentMethodRef = await database
    .collection(process.env.PAYMENT_METHODS_DOC)
    .add({
      userId: req.user.id,
      cardNumber,
      cardHolderName,
      expirationDate,
      cvv,
      balance: parseInt(process.env.DEFAULT_BALANCE),
    });

  res.status(httpStatus.CREATED).json({
    message: 'Payment method created successfully',
    paymentMethod: {
      id: newPaymentMethodRef.id,
      userId: req.user.id,
      cardNumber,
      cardHolderName,
      expirationDate,
      balance: parseInt(process.env.DEFAULT_BALANCE),
    },
  });
};

module.exports = addPaymentMethod;
