const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  importance: {
    type: String,
    set: function(value) {
      const validImportanceValues = ['not important', 'medium importance', 'important'];
      if (validImportanceValues.includes(value)) {
        return value;
      }
      return 'medium importance';
    },
    default: 'medium importance',
    required: true,
  },
  checklist: {
    type:Schema.Types.ObjectId,
    ref: 'checklist',
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
})

module.exports = mongoose.model('list', ListSchema)
