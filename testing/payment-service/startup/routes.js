const express = require('express');
require('express-async-errors');
const cors = require('cors');
const paymentMethod = require('../routes/paymentMethod.route.js');
const escrowTransaction = require('../routes/escrowTransaction.route.js');
const error = require('../middlewares/error');

module.exports = (app) => {
  app.use(express.json());
  app.use(cors({ origin: true }));
  app.use('/payment-service/paymentMethod', paymentMethod);
  app.use('/payment-service/escrowTransaction', escrowTransaction);
  app.use(error);
};
