const express = require("express");
var Imap = require("imap"),
inspect = require("util").inspect;
const MailParser = require("mailparser").MailParser;

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
            return res.redirect("/dashboard");
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
                      res.redirect("/process-receipt/parseEmail");
                      // Redirect to the waiting page
                      // res.redirect("/parser/waiting-for-items");
                    });
                  })
                );
                data.release()
              }
            });
  
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

}

