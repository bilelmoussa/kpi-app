const express = require('express');
const router = express.Router();
const passport = require('passport');

//parts options
const options = require('../options/new_part');

//machines models
const N2_Part = require('../../models/n2');

//get custom authentication 
const auth = require('../options/passport_auth');
const write_auth = require('../options/write_auth');
const update_auth = require('../options/update_auth');
const delete_auth = require('../options/delete_auth');

//get all parts worked with n2
router.get('/findparts', (req, res, next)=>{
	
  passport.authenticate('jwt', {session: false}, function(err, user){
    auth(req, res, next,err,user,N2_Part);
  })(req, res, next)
  
});

//create new part to n2
router.post('/saveparts',(req, res, next)=>{
  passport.authenticate('jwt', {session: false}, function(err, user){
    write_auth(req, res, next,err,user,N2_Part,options);
  })(req, res, next)
});

//update part to n2
router.put('/updateparts',(req, res, next)=>{
  let query = req.body.query;
  passport.authenticate('jwt', {session: false}, function(err, user){
    update_auth(req, res, next,err,user,N2_Part, query);
  })(req, res, next)
});

//delete part from n2
router.delete('/deleteparts',(req, res, next)=>{
  passport.authenticate('jwt', {session: false}, function(err, user){
    delete_auth(req, res, next,err,user,N2_Part);
  })(req, res, next)
});

module.exports = router;