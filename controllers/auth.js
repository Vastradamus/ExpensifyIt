const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

// using object insted of hard coding redirect pages 
const REDIRECT_ROUTES = {
  login: '/login',
  signup: '/signup',
  logout: '/logout',
  home: '/',
  main: '/dashboard'
};


// Renders the login page

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect(REDIRECT_ROUTES.main)
    }
    res.render('login', {
      title: 'login' 
    })
  }



  // / Handles the login form submission

  exports.postLogin = (req, res, next) => {

    const validationErrors = [] // Placeholder for inputting error messages
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
     // If there is an error, redirect back to the login page

    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect(REDIRECT_ROUTES.login)
    }

     // This line makes emails easier to work with

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      // checks for errors
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect(REDIRECT_ROUTES.login)
      }
         // If there are no errors, it tries to log in the user

      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || REDIRECT_ROUTES.main)
      })
    })(req, res, next)
  }
  
  // Logs out the user

  exports.logout = (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      // Destroy cookies?
      req.session.destroy((err) => {
        if (err) console.log("Error : Failed to destroy the session during logout.", err);
        req.user = null;
        res.redirect(REDIRECT_ROUTES.home);
      });
    });
  };
  // Renders the signup page
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect(REDIRECT_ROUTES.main)
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }

// This is good for now, but we should make it render instead of redirect or use req.flash to store data. Now, if you do not pass the validation, you will have to enter all the information later on. We will fix it later on
  
  exports.postSignup = async (req, res, next) => {
    try {
      const validationErrors = [];
      if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: 'Please enter a valid email address.' });
      if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({ msg: 'Password must be at least 8 characters long' });
      if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({ msg: 'Passwords do not match' });
  
      if (validationErrors.length) {
        req.flash('errors', validationErrors);
        return res.redirect(REDIRECT_ROUTES.signup); 
      }
      req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
      });
  
      const existingUser = await User.findOne({
        $or: [
          { email: req.body.email },
          { userName: req.body.userName },
        ],
      }).exec();
  
      if (existingUser) {
        req.flash('errors', {
          msg: 'Account with that email address or username already exists.',
        });
        return res.redirect(REDIRECT_ROUTES.signup);
      }
  
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        fullName: req.body.fullName
      });
  
      await user.save();
  
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect(REDIRECT_ROUTES.main);
      });
    } catch (err) {
      return next(err);
    }
  };
  