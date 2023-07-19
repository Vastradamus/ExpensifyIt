const Checklist = require('../models/checklist')
const Folder = require('../models/folder')
const Todo = require('../models/List')
module.exports = {
    getChecklist: async (req,res)=>{
        console.log(req.user)
        try{
            const checklistAll = await Checklist.find({user:req.user.id})
            const foldersAll = await Folder.find({user:req.user.id})
            res.render('checklists.ejs', {checklists: checklistAll, user: req.user, folders: foldersAll})
        }catch(err){
            console.log(err)
        }
    },
    createChecklist: async (req, res)=>{
        try{
            const checklistData = {title: req.body.title, user: req.user.id}
            if (req.body.folderId) {
                checklistData.folder = req.body.folderId;
            }
            await Checklist.create(checklistData)
            console.log('Checklist has been added!')
            res.redirect('/checklists')
        }catch(err){
            console.log(err)
        }
    },
    deleteChecklist: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.deleteMany({checklist:req.body.todoIdFromJSFile})
            await Checklist.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted checklist')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
        
        
    },
    createFolder: async (req, res)=>{
        try{
            await Folder.create({name: req.body.folderName, user: req.user.id})
            console.log('folder has been added!')
            res.redirect('/checklists')
        }catch(err){
            console.log(err)
        }
    },
    deleteFolder: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            // all checklist realted to folder
            const relatedChecklists = await Checklist.find({folder:req.body.todoIdFromJSFile})
            // all todos related to checklists 

            for(let checklist of relatedChecklists) {
                await Todo.deleteMany({checklist: checklist._id});
            }

            await Checklist.deleteMany({folder: req.body.todoIdFromJSFile});
            await Folder.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted checklist')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
  
}    