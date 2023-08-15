const express = require('express')
const router = express.Router()
const processController = require('../controllers/ProcessReceipt') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/getEmail', ensureAuth,processController.getEmail)

module.exports = router


