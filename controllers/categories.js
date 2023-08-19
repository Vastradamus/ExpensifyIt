const Category = require("../models/Categories");

module.exports = {
    getIndex: async (req,res)=>{
        const userId = req.user._id; 
        const allCategories = await Category.find({
            $or: [
              { isDefault: true },
              {  userId: userId }
            ]
          });
          console.log(userId)
        res.render('categories.ejs', { categories: allCategories});
    },
    createCategory: async (req,res) => {
        const newCategoryName = req.body.categoryName
        console.log('category name ', newCategoryName)
       const existingItem = await Category.findOne({name: newCategoryName})
        const userId = req.user._id
      
        if (existingItem ) {
            console.log('item already exists');
            res.redirect('/categories');
        } else {
            await Category.create({
                name: newCategoryName,
                userId: userId
            })
            console.log('folder has been added!')
                res.redirect('/categories')
        }

        
    },
    createSubCategory: async (req,res) => {
        const newsubCategoryName = req.body.subCategoryName
        const categoryId = req.body.categories
        console.log('viiiiiiiiiiiiiiiu')
        console.log(categoryId)
        console.log(newsubCategoryName)

        const existingItem = await Category.findOne({
            _id: categoryId,
            subCategories: {
              $elemMatch: { name: newsubCategoryName }
            }
          });
          console.log(existingItem)
        if (existingItem) {
           console.log('item aldraedy exists')
           res.redirect('/categories')
        } else {
            await Category.findByIdAndUpdate(categoryId, {
                $push: {
                  subCategories: {
                    name: newsubCategoryName,
                    userId: req.user._id
                  }
                }
              });
            console.log('subcategory has been added!')
                res.redirect('/categories')
        }

      
    },

}