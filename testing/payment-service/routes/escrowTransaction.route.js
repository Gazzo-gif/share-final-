const express = require('express');
const authentication = require('../middlewares/authentication.js');
const addEscrowTransactionService = require('../controllers/addEscrowTransaction.service.js');
const updateEscrowTransactionService = require('../controllers/updateEscrowTransaction.service.js');
const { db } = require('../startup/firebase.js');
const router = express.Router();

router.post('/', authentication, (req, res) => addEscrowTransactionService(req, res, db));
router.patch('/:id', authentication, (req, res) => updateEscrowTransactionService(req, res, db));

module.exports = router;