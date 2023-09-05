const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/',ensureAuth, dashboardController.getIndex)
router.get('/lastReceiptCategories', dashboardController.lastReceiptCategories)
module.exports = router