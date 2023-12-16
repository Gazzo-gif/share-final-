const express = require('express');
const authentication = require('../middlewares/authentication.js');
const addPaymentMethodService = require('../controllers/addPaymentMethod.service.js');
const getMyPaymentMethodService = require('../controllers/getMyPaymentMethod.service.js');
const updateMyPaymentMethodService = require('../controllers/updateMyPaymentMethod.service.js');
const deleteMyPaymentMethodService = require('../controllers/deleteMyPaymentMethod.service.js');
const { db } = require('../startup/firebase.js');
const router = express.Router();

router.post('/', authentication, (req, res) => addPaymentMethodService(req, res, db));
router.get('/', authentication, getMyPaymentMethodService);
router.patch('/', authentication, updateMyPaymentMethodService);
router.delete('/', authentication, deleteMyPaymentMethodService);

module.exports = router;