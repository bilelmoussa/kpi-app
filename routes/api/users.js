const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require("../../config/keys");


// mongoose user module 
const User = require('../../models/user');

//get custom authentication 
const update_user_auth = require('../options/update_user_auth');
const update_user_role = require('../options/update_user_role');


// register
router.post("/register", (req, res, next)=>{    
    let user_name = req.body.user_name;
    let password = req.body.password;
	
    User.getUserByUsername(user_name, (err, user)=>{
        if(err){
            console.log('Error : ', err);
            return res.status(400).json({success: false, msg: "error !"})
        }
        else if(user){
            return res.status(400).json({success: false, msg: "user already exist ! please change username"});
        }
        else if(!/^[a-z0-9]+$/i.test(password) || password.length < 8 || !password){
            return res.status(400).json({success: false, msg: "password must be at leaset 8 characters and contain only alphanumeric"})
        }
        else{
            let newUser = new User({
                name: req.body.name,
                user_name: req.body.user_name,
                password: req.body.password,
            });
    
            User.addUser(newUser, (err, user)=>{
                if(err){
                    console.log(`Error: `, err);
                    res.status(400).json({success: false, msg:"server error !", err:err.message})
                }else{
                    res.json({success: true, msg:'Regsitered with success', user_id: user._id})
                };
            });
        }
    })
});



//log
router.post("/login", (req, res, next)=>{
    
    const user_name = req.body.user_name;
    const password = req.body.password;


    User.getUserByUsername(user_name, (err, user)=>{
        if(err){
            console.log(`Error: `, err);
            return res.status(400).json({success: false, msg: err});
        }else if(!user){
            return res.status(404).json({success: false, msg: 'user not found'});
        }else{

        User.camparePassword(password, user.password, (err, isMatch) => {
            if(err){
                console.log(`Error: `, err);
                return res.status(400).json({success: false, msg:err.message})
            }else{
            if(isMatch){
                    const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800, 
                  });
               return res.json({
                    success: true,
                    token: 'bearer ' +token,
                    user: {
						userId: user.id,
                        user_name: user.user_name,
						userRole: user.role,
                    } 
                })   
            }else{
                return res.status(400).json({success: false, msg: 'wrong password'});
            }
        }
        });
    }     
    })

});

router.post('/profile', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, function(err, user){
        if (err) { return next(err); }
        if (!user) { return res.json('Unauthorised'); }})
        if(user){
            let user_name = req.body.user_name;
            User.findOne(user_name).then(user =>{res.json({success: true, 
                user_data:{user_name: user.user_name,
                            id: user._id,
                            full_name : user.full_name,
                            role: user.role,
                            created_at: user.created_at
                }
            })}).catch(err =>{console.log(err); res.json({errors: err})})
        }else{
            return res.json('Unauthorised')  
        }
})


router.get('/fetch_users', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, function(err, user){
        if (err) { return next(err); }
        if (!user) { return res.json('Unauthorised'); }
        if(user.role == 'admin'){
            User.find().then(users =>{res.json({users: users})}).catch(err =>{console.log('Error', err); res.json({errors: err})});
        }
        else{
            return res.json('Unauthorised')  
        } 
    })
})


router.put('/update_user', (req, res, next)=>{
    let query = req.body.query;
    passport.authenticate('jwt', {session: false}, function(err, user){
        update_user_auth(req,res,next,err,user,query,User);
    })
})

router.put('/update_user_role',(req, res, next)=>{
    let query = {role: req.role};
    passport.authenticate('jwt', {session: false}, function(err, user){
        update_user_role(req,res,next,err,user,query,User);
    })
})

router.delete('/delete_user', (req,res,next)=>{
    passport.authenticate('jwt', {session: false}, function(err, user){
        if (err) { return next(err); }
        if (!user) { return res.json('Unauthorised'); }
        if(user == 'admin'){
        let id = {id: req.body.id};
        User.findOneAndDelete(id).then(user=>{res.json({user: user})}).catch(err=>{res.status(404).json({errors: err})})
        }
    })
})

module.exports = router;