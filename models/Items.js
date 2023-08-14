const mongoose = require("mongoose");

const SharedItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Category',
   required: true,
 },
 subCategory: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Category.subCategories',
   required: true,
 },
 
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
    
    main: {
      type: Boolean,
      default: true
     }
});

module.exports = mongoose.model("Items", ItemsSchema);
