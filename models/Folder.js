const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FolderSchema = new Schema({
    name: { 
        type: String, 
        required: true },
    user: { 
        type: Schema.Types.ObjectId, ref: 'User',
         required: true },  // reference to a user
});

module.exports = mongoose.model('Folder', FolderSchema)