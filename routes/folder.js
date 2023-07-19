const express = require('express')
const router = express.Router()
const folderController = require('../controllers/folder') 
const { ensureAuth } = require('../middleware/auth')

router.get('/:folderId', ensureAuth, folderController.getChecklist)

router.post('/:folderId/createChecklist', ensureAuth, folderController.createChecklist)

router.delete('/deleteChecklist', ensureAuth, folderController.deleteChecklist)

module.exports = router
