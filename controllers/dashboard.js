const Receipt = require("../models/Receipt");
const Category = require("../models/Categories");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const receipts = await Receipt.find({ user: req.user._id });
      const receiptTotal = receipts.reduce((total, receipt) => total + +receipt.total, 0).toFixed(0);

      const lastReceiptTotal = receipts[receipts.length - 1].total;

      res.render("dashboard.ejs", {
        receipts: receipts,
        receiptTotal: receiptTotal,
        lastreceipt: lastReceiptTotal,
        userEmail: req.user.email
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },
  lastReceiptCategories: async (req, res) => {
    try {
      console.log(req.user._id)
      const receipts = await Receipt.find({ user: req.user._id })
        .populate({
          path: "categories.name",
          model: "Category",
        })
        .populate({
          path: "categories.subCategories.name",
          model: "Category",
        })
        .exec();
  
      const lastReceipt = receipts[receipts.length - 1];
      console.log(lastReceipt)
      const lastReceiptCategories = lastReceipt.categories;
  
      console.log(JSON.stringify(lastReceiptCategories, null, 2));
      res.json(lastReceiptCategories);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }
};
