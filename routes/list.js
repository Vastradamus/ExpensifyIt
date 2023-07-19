const express = require('express')
const router = express.Router()
const listController = require('../controllers/list') 
const { ensureAuth } = require('../middleware/auth')

router.get('/:id', ensureAuth, listController.getTodos)

router.post('/:id/createTodo', listController.createTodo)

router.put('/markComplete', listController.markComplete)

router.put('/markIncomplete', listController.markIncomplete)

router.delete('/deleteTodo', listController.deleteTodo)

router.put('/:id/resetChecklist', listController.resetChecklist)


module.exports = router