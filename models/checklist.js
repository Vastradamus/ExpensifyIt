const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChecklistSchema = new Schema({
    title: { 
        type: String, 
        required: true },

    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true },  // reference to a user

    folder: { 
         type: Schema.Types.ObjectId, 
         ref: 'Folder' }, // This can be null if the checklist is not in a folder
    
        createdAt: {
            type: Date,
            default: Date.now,
          },
});

module.exports = mongoose.model('Checklist', ChecklistSchema)