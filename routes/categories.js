const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/',ensureAuth, categoriesController.getIndex)
router.post('/createCategory', categoriesController.createCategory)
router.post('/createSubCategory', categoriesController.createSubCategory)
module.exports = router