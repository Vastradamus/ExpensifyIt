const REDIRECT_ROUTES = {
  home: '/',
  main: '/checklists'
};


module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
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

