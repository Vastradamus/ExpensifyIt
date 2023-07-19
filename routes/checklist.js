const express = require('express')
const router = express.Router()
const checklistController = require('../controllers/checklist') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, checklistController.getChecklist)

router.post('/createChecklist', checklistController.createChecklist)


router.delete('/deleteChecklist', checklistController.deleteChecklist)

router.post('/createFolder', checklistController.createFolder)


router.delete('/deleteFolder', checklistController.deleteFolder)


module.exports = router