const Receipt = require("../models/Receipt");
const Category = require("../models/Categories");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const receipts = await Receipt.find({ user: req.user._id });

      const receiptTotal = receipts?.reduce((total, receipt) => total + (receipt?.total ?? 0), 0).toFixed(0) ?? 0;
        const lastReceiptTotal = receipts?.[receipts.length - 1]?.total.toFixed() ?? 0;
   
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const thisMonthReceipts = receipts.filter(receipt => {
          const receiptDate = new Date(receipt.createdAt);
          return receiptDate.getMonth() === currentMonth && receiptDate.getFullYear() === currentYear;
        });

        const thisMonthTOtal = thisMonthReceipts?.reduce((total, receipt) => total + (receipt?.total ?? 0), 0).toFixed(0) ?? 0;


      res.render("dashboard.ejs", {
        receipts: receipts,
        receiptTotal: receiptTotal,
        lastreceipt: lastReceiptTotal,
        userEmail: req.user.email,
        thisMonth: thisMonthTOtal
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },
  lastReceiptCategories: async (req, res) => {
 
    try {
      console.log('ovo radi?')
      console.log(req.user._id);
      const receipts = await Receipt.find({ user: req.user._id ,  total: { $ne: 0 }})
        .populate({
          path: "categories.name",
          model: "Category",
        })
        .populate({
          path: "categories.subCategories.name",
          model: "Category",
        })
        console.log('VIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
        console.log(JSON.stringify(receipts, null, 2));
        console.log('VIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
        console.log(JSON.stringify(receipts, null, 2));
      const lastReceipt = receipts[receipts.length - 1];
      // Aggregate for all receipts
      const aggregateCategories = {};
      receipts.forEach(receipt => {
        receipt.categories.forEach(category => {
          console.log("check" ,category, "check")
          // Check if category name exists
          if (category.name && category.name.name) { 
              const categoryName = category.name.name;
              
              if (!aggregateCategories[categoryName]) {
                  aggregateCategories[categoryName] = { totalSpend: 0, subCategories: {} };
              }
              aggregateCategories[categoryName].totalSpend += category.totalSpend;
      
              category.subCategories.forEach(subCategory => {
                // console.log("check", subCategory, "check")
                  // Check if subcategory name exists
                  if (subCategory.name && subCategory.name.name) { 
                      const subCategoryName = subCategory.name.name;
                      console.log( 'SUUUUUUUUUUUUUUUUB', subCategoryName , "SUUUUUUUUUUUUB")
                      if (!aggregateCategories[categoryName].subCategories[subCategoryName]) {
                          aggregateCategories[categoryName].subCategories[subCategoryName] = 0;
                      }
                      aggregateCategories[categoryName].subCategories[subCategoryName] += subCategory.totalSpend;
                  }
              });
          }
      });
      
    });
      res.json({
        allReceipts: aggregateCategories,
        lastReceipt: lastReceipt.categories,
      });
    } catch (error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      res.status(500).send("An error occurred");
    }
  },
  

};
