var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Notes' 
  });
});
// router.get('/', function(req, res, next) {
//   res.redirect('/notes');
// });

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
// -passport req.user object accessible once authenticated
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/notes',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
