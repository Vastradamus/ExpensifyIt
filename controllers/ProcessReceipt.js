const express = require("express");
const Receipt = require("../models/Receipt");
var Imap = require("imap"),
inspect = require("util").inspect;
const MailParser = require("mailparser").MailParser;
const cloudinary = require("../middleware/cloudinary");





module.exports = {
  getEmail: async (req, res) => {
    console.log("req.user:", req.user);
    console.log("req.session:", req.session);
    var imap = new Imap({
      user: process.env.IMAP_USER,
      password: process.env.IMAP_PW,
      // user: "receipt.sorting@gmail.com",
      // password: "vryrcckfgczdwoax",
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
              console.log("Error marking as read");
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
                    console.log(result, error);
  
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
  
                      // Redirect to the waiting page
                      // res.redirect("/parser/waiting-for-items");
                    });
                  })
                );
                data.release();
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
  }
}
