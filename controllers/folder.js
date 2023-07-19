const Checklist = require('../models/checklist')
const Folder = require('../models/folder')
module.exports = {
    getChecklist: async (req,res)=>{
        console.log(req.params.folderId)
        try{
            const checklistAll = await Checklist.find({folder:req.params.folderId})
            res.render('folder.ejs', {checklists: checklistAll, user: req.user, folderId: req.params.folderId})
        }catch(err){
            console.log(err)
        }
    },
    createChecklist: async (req, res)=>{
        try{
            console.log(req.params)
            await Checklist.create({title: req.body.title, user: req.user.id, folder: req.params.folderId})
            console.log('Checklist has been added!')
            res.redirect(`/folder/${req.params.folderId}`)
        }catch(err){
            console.log(err)
        }
    },
    deleteChecklist: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Checklist.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted checklist')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
        
        
    },

}    