var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var generateJWT = require('.././jwt');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/signup')
  .post(function(req, res, next) {
      var signup_user = new Users();
      signup_user.id = new ObjectId();
      signup_user.firstname = req.body.params.firstname;
      signup_user.lastname = req.body.params.lastname;
      signup_user.email = req.body.params.email;
      signup_user.password = req.body.params.password;

      signup_user.save(function(err) {
          if (err)
          {
            console.log(err)
          }
          else
          {
            // create token
            var token = generateJWT.generateJWT(signup_user)
            res.json({
              allow: true,
              user: signup_user.id,
              token: token,
            });
          }
      });
  });

module.exports = router;
