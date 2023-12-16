const updateBalance = async (userId, amount, database) => {
  const paymentMethodSnapshot = await database
    .collection(process.env.PAYMENT_METHODS_DOC)
    .where('userId', '==', userId)
    .limit(1)
    .get();

  if (!paymentMethodSnapshot.empty) {
    const paymentMethodRef = paymentMethodSnapshot.docs[0].ref;

    const currentbalance = paymentMethodSnapshot.docs[0].data().balance;
    const updatedBalance = currentbalance + amount;

    if (updatedBalance < 0) {
      return {
        status: false,
        error: 'Insufficient funds',
      };
    }

    await paymentMethodRef.update({ balance: updatedBalance });

    return {
      status: true,
    };
  } else {
    return {
      status: false,
      error: 'Payment method not found for the user',
    };
  }
};

module.exports = updateBalance;
