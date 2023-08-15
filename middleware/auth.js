const REDIRECT_ROUTES = {
  home: '/',
  main: '/dashboard'
};


module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('user is logged in')
      return next()
    } else {
      console.log('user is not logged in')
      res.redirect(REDIRECT_ROUTES.home)
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    } else {
      res.redirect(REDIRECT_ROUTES.main) 
    }
  }
}

