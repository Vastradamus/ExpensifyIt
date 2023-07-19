const Todo = require('../models/List')
const Folder = require('../models/folder')
const Checklist = require('../models/checklist')

module.exports = {
    getTodos: async (req,res)=>{
        try{
            const clName = await Checklist.findOne({_id:req.params.id})
            const todoItems = await Todo.find({checklist:req.params.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const itemsDone = await Todo.countDocuments({userId:req.user.id,completed: true})
            const foldersAll = await Folder.find({user:req.user.id})
            res.render('list.ejs', {todos: todoItems, left: itemsLeft, done: itemsDone, user: req.user, checklistId: req.params.id, checklist: clName, folders: foldersAll})
            console.log(clName)
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({
                todo: req.body.todoItem, 
                completed: false, 
                user: req.user.id, 
                importance: req.body.toDoImportance, 
                checklist: req.params.id})
            console.log('Todo has been added!')
            res.redirect(`/list/${req.params.id}`)
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    resetChecklist: async (req, res) => {
        try {
            console.log(req.params)
            const todoItems = await Todo.find({checklist: req.params.id})
    
            for (let el of todoItems) {
                await Todo.findOneAndUpdate({_id: el._id}, {
                    completed: false
                })
            }
            
            console.log('checklist reset')
            res.json({message: 'Marked Incomplete'});
        } catch(err) {
            console.log(err);
            res.status(500).json({message: 'Server error'});
        }
    },
}    