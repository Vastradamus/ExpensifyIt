const express = require("express");
var Imap = require("imap"),
inspect = require("util").inspect;
const MailParser = require("mailparser").MailParser;
const Category = require("../models/Categories")
const cloudinary = require("../middleware/cloudinary");
const { createWorker } = require('tesseract.js');



const Categories = require('../models/Categories')
const Receipt = require("../models/Receipt");
const SharedItems = require('../models/Items');

const parseReceiptText = (receiptText) => {
  let lines = receiptText.split('\n');
  let items = [];

  // Iterate over the lines
  for(let i = 0; i < lines.length; i++) {
    // If the line contains three numeric values, it's an item line
    let match = lines[i].match(/([\d,]+)\s([\d,]+)\s([\d,]+)/);
    if(match) {
      // get name from the second previous line (skipping the empty line)
      let name = lines[i-2].match(/[^/-]*/)[0].trim();
      let [_, price, quantity, total] = match;
      price = parseFloat(price.replace(',', '.'));
      quantity = parseFloat(quantity.replace(',', '.'));
      total = parseFloat(total.replace(',', '.'));
      items.push({name, price, quantity, total});
    }
  }
  
  return items;
};

const parseTest = async (req, res) => {
console.log('parseTest is starting')
const worker = await createWorker({
    logger: m => console.log(m)
});

const imageUrl = req.session.cloudinaryUrl; 
console.log('pre racuna')
console.log(req.session.cloudinaryUrl)
await worker.loadLanguage('srp_latn'); 
await worker.initialize('srp_latn');

const { data: { text } } = await worker.recognize(imageUrl);
console.log(text)

await worker.terminate();

let items = parseReceiptText(text)

// loop trough items,
for (let item of items) {
    const sharedItem = await SharedItems.findOne({ name: item.name, user: req.user._id });

    if (sharedItem) {
      item.categoryId = sharedItem.category.toString();
      item.subCategoryId = sharedItem.subCategory.toString()
   
      const category = await Categories.findOne({ "subCategories._id": item.subCategoryId });
      const subCategory = category.subCategories.id(item.subCategoryId);
      item.subCategoryName = subCategory.name;
    }
}

// Extract items and details
const allCaterories = await Categories.find({}) ////////// ovde mozda treba filter samo za njegove 
res.render('parser.ejs', { receiptText: items, categories: allCaterories, receiptId: req.session.receiptId });
}

module.exports = {
 getEmail: async (req, res) => {
    console.log("req.user:", req.user);
    console.log("req.session:", req.session);
    var imap = new Imap({
      user: process.env.IMAP_USER,
      password: process.env.IMAP_PW,
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false,
      },
      // debug: console.log, // Enable debug output
    });
  
    function openInbox(cb) {
      imap.openBox("INBOX", false, cb);
    } 
  
    imap.once("ready", function () {
      openInbox(function (err, box) {
        if (err) throw err;
        imap.search(["UNSEEN", ["FROM", req.user.email]], function (err, results) {
          console.log('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest')
          console.log(req.user.email)
          if (!results || results.length === 0) {
            console.log("No unseen email available");
            imap.end();
            res.json({
              success: false,
            })
          }
          imap.addFlags(results, ["\\Seen"], { uid: true }, function (err) {
            if (err) {
              console.log("Error marking as read")
              console.log(JSON.stringify(err, null, 2));
            } else {
              console.log("Marked as read");
            }
          });
  
          if (err) throw err;
          if (results.length == 0) {
            console.log("No unread messages from markovasic197@gmail.com");
            imap.end();
            return;
          }
          var f = imap.fetch(results, { bodies: [""], struct: true });
          console.log("tracking f:", JSON.stringify(f, null, 2));
          f.on("message", function (msg, seqno) {
            console.log("Message #%d", seqno);
            var prefix = "(#" + seqno + ") ";
  
            var parser = new MailParser();
            parser.on("data", (data) => {
              if (data.type === "attachment") {
                data.content.pipe(
                  cloudinary.uploader.upload_stream(function (error, result) {
                    console.log(result, error)
  
                    const userId = req.user._id; // not sure if correct
                    console.log("user id loooged");
                    console.log(result.url)
                    let receipt = new Receipt({
                      user: userId,
                      items: [],
                      total: 0,
                      cloudinary: result.url,
                    });
  
                    // Save the receipt
                    receipt.save().then((savedReceipt) => {
                      // Store the Cloudinary URL and receipt ID in the session (or other storage)
                      console.log('mark me')
                      console.log(JSON.stringify(savedReceipt), null, 2)
                      console.log('oveeeeeeeeeeeeeeeeeee fail mozda ', savedReceipt._id)
        
                      req.session.cloudinaryUrl = result.url;
                      req.session.receiptId = savedReceipt._id;
                      console.log('123123', req.session.cloudinaryUrl)
                      // res.redirect("/process-receipt/parseEmail");
                      // Redirect to the waiting page
                      // res.redirect("/parser/waiting-for-items");
                      res.json({
                        success: true,
                        url: result.url
                      })
                    });
                  })
                );
                data.release()
              }
            }) ;
  
            // Create a new receipt with the Cloudinary URL
  
            msg.on("body", function (stream, info) {
              stream.pipe(parser);
            });
  
            msg.once("end", function () {
              console.log(prefix + "Finished");
            });
          });
  
          f.once("error", function (err) {
            console.log("Fetch error: " + err);
          });
  
          f.once("end", function () {
            console.log("Done fetching all messages!");
            imap.end();
          });
        });
      });
    }); // once ready
  
    imap.once("error", function (err) {
      console.log(err);
    });
  
    imap.once("end", function () {
      console.log("Connection ended");
    });
  
    imap.connect();
  },











  parseEmail: parseTest,

  saveChanges: async (req, res) => {
    try {
      // input user id, articles , receipt id
      console.log("krece funcija save changes");
      const articles = req.body.ReceiptArticles;
      const userId = req.user._id; // ********** temp fix ***************
      const newReceipt = req.session.receiptId; // id of the receipt
      console.log('IT"S A FINAL COUNTDOWN')
      console.log(newReceipt)
      const userItems = await SharedItems.find({
        $or: [{ main: true }, { user: userId }],
      });
      const receiptFactory = new ReceiptFactory();

      console.log("ulayi u loop");
      for (const article of articles) {
        // update db for categories
        const itemId = await itemController(article, userItems, userId);
        console.log("article added");
        receiptFactory.addItem(article, itemId);
        receiptFactory.addCategoryAndSubcategory(article );
      }
      // update receipt
      console.log ('izasao si iz loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooop')
  
     function updateReceipt () {
      receiptFactory.addReceiptToDB(newReceipt, receiptFactory);
     } 

      updateReceipt()

      console.log("updating receipt");

      res.json({ redirectUrl: "/dashboard"})
    } catch (error) {
      console.error("An error occurred while adding receipt to DB:", error);
      throw error;
    }
  },
  getSubcategories: async (req, res) => {
    try {
      console.log("odavde krece getSbucategories funcija tako da ne gledas nista iznad ");
      const mainCategoryId = req.params.id;
      console.log(mainCategoryId);
      const category = await Category.findById(mainCategoryId);
      console.log(category.subCategories);

      // Returning the subCategories array as JSON
      res.json(category.subCategories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
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

async function itemController(article, userItems, userId) {
  console.log('u item contolleru si')
  const factory = new ItemFactory();
  const existingItems = userItems.filter((item) => item.name === article.name);
  let item;
console.log(existingItems)
  if (existingItems.length === 0) {
    if (await isDefaultCategory(article.category, article.subCategory)) {
      item = await factory.createDefaultItem(article);
    } else {
      item = await factory.createCustomItem(article, userId);
    }
    return item._id;
  }

  const matchedCategories = existingItems.filter((item) => item.category.toString() === article.category.toString() && item.subCategory.toString() === article.subCategory.toString());

  if (matchedCategories.length === 1) {
    return matchedCategories[0]._id;
  }
  console.log('boooookmaaaaaaaaaark')
  console.log(existingItems)
  const customItem = existingItems.find((item) => item.main === false);
  console.log(customItem)
  if (customItem) {
    item = await factory.updateCustomItem(customItem, article);
  } else {
    item = await factory.createCustomItem(article, userId);
  }
  return item._id;
}

class ItemFactory {
  async createItem(article, main = false, userId = null) {
    let matchedItem = new SharedItems({
      name: article.name,
      category: article.category,
      subCategory: article.subCategory,
      main: main,
    });
    if (userId) {
      matchedItem.user = userId;
    }
    await matchedItem.save();
    return matchedItem;
  }

  async createCustomItem(article, userId) {
    return this.createItem(article, false, userId);
  }

  async createDefaultItem(article) {
    return this.createItem(article, true);
  }

  async updateCustomItem(customItem, article) {
    customItem.category = article.category;
    customItem.subCategory = article.subCategory;

    try {
      await customItem.save();
      console.log("Custom item updated successfully!");
      return customItem 
    } catch (error) {
      console.error("An error occurred while updating the custom item:", error);
    }
  }
}

async function isDefaultCategory(categoryId, subCategoryName) {
  console.log('article.category ')
  console.log(categoryId)
  const category = await Category.findById(categoryId );
  console.log('category ovde fail')
  console.log(JSON.stringify(category, null, 2));
  console.log(category)
  if (!category.isDefault) {
    return false;
  }
console.log('subcategory name ', JSON.stringify(subCategoryName, null, 2))
const subCategory = category.subCategories.find((subCat) => subCat._id.toString() === subCategoryName);

  console.log('ovde je sub category')
console.log(subCategory)
  return subCategory.isDefault;
}

class ReceiptFactory {
  constructor() {
    this.receiptArticles = [];
    this.categories = {};
    this.totalReceiptSpend = 0;
  }

  addItem(article, itemId) {
    const receiptItem = {
      item: itemId,
      price: article.price,
      quantity: article.quantity,
      category: article.category,
    };
    this.receiptArticles.push(receiptItem);
  }

  addCategoryAndSubcategory(article) {
    const categoryId = article.category.toString(); // Convert ObjectId to string
    const subcategoryId = article.subCategory.toString(); // Convert ObjectId to string
  
    // Check if the category exists; if not, create it
    if (!this.categories[categoryId]) {
      this.categories[categoryId] = {
        totalSpend: 0,
        subCategories: [], // Initialize as an array
      };
    }
  
    // Find or create the subcategory
    let subcategory = this.categories[categoryId].subCategories.find(
      (subCat) => subCat.id === subcategoryId
    );
  
    if (!subcategory) {
      subcategory = { id: subcategoryId, totalSpend: 0 };
      this.categories[categoryId].subCategories.push(subcategory);
    }
  
    // Add the article's price to the subcategory's total spend
    subcategory.totalSpend += +article.price; // Convert to number if needed
    this.categories[categoryId].totalSpend += +article.price
    // Add total spent for receipt
    this.totalReceiptSpend += +article.price; // Convert to number if needed
  }
  

  getReceiptArticles() {
    return this.receiptArticles;
  }

  getCategories() {
    return this.categories;
  }

  getTotalReceiptSpend() {
    return this.totalReceiptSpend;
  }

  async addReceiptToDB(receiptid, receiptFactory) {
    try {
      const totalSpend = parseFloat(receiptFactory.getTotalReceiptSpend());
      const items = receiptFactory.getReceiptArticles(); // []
      const categoriesObject = receiptFactory.getCategories(); // {} 
      const categories = await Promise.all(Object.keys(categoriesObject).map(async (categoryName) => {
        const categoryData = categoriesObject[categoryName];
        return {
          name: categoryName,
          totalSpend: categoryData.totalSpend,
          subCategories: categoryData.subCategories.map((subCategoryData) => {
            console.log('viuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', subCategoryData)
            return {
             
              name: subCategoryData.id,
              totalSpend: subCategoryData.totalSpend 
            };
          })
        };
      }));
  
      const receipt = await Receipt.findById(receiptid);
      console.log('categories object console logged ')
      console.log(JSON.stringify(categoriesObject, null , 2))
      // Update the receipt fields
      receipt.total = totalSpend;
      receipt.items = items.map(item => ({
        item: item.item,
        price: item.price,
        quantity: item.quantity,
        category: {
          name: item.category,
          totalSpend: categoriesObject[item.category].totalSpend,
          subCategories: categoriesObject[item.category].subCategories.map(subCat => ({
            name: subCat.id, // This should be the actual name, not the id
            totalSpend: subCat.totalSpend
          }))
        }
      }));
      receipt.categories = categories;
  
      await receipt.save();
    } catch (error) {
      console.error("An error occurred while adding receipt to DB:", error);
      throw error;
    }
  }

  
}
