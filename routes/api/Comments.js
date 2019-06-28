const express = require('express');
const router = express.Router();
const passport = require('passport');

const Comment = require('../../models/Comments');

const isEmpty = require('../../validations/isEmpty');

router.post('/AddComment', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err)
            res.status(400).json('Server Error !')
        }
        else if(user){
            if(user.role === 'admin' || user.role === "staff"){
                let val = req.body.CommentValue;
                let categorie = req.body.CommentCategorie;

                if(isEmpty(val) || isEmpty(categorie)){
                    res.status(400).json("Empty Fields");
                }else{
                    let newComment = new Comment({
                        CommentValue: val,
                        CommentCategorie: categorie
                    })
                    newComment.save()
                    .then(data=>{
                        res.status(200).json({
                            success: true,
                            value: data
                        })
                    })
                    .catch(err=>{
                        console.log(err); 
                        res.status(400).json("Server Error !")
                    })
                }

            }else{
				res.status(404).json("Unauthorised !")
			}
        }else{
			res.status(404).json("Unauthorised !")
		}
    })(req, res, next)
})

router.get('/GetComment', (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(400).json("Server Error !");
        }else if(user){
            if(user.role === 'admin' || user.role === "staff"){
                Comment.find()
                .then(data=>{
                    let N2Comment = [];
                    let N2Plus150Comment = [];
                    let N2Plus50Comment = [];

                    if(!isEmpty(data)){
                        data.forEach((d, i)=>{
                            if(d.CommentCategorie === "N2"){
                                N2Comment.push(d)
                            }else if(d.CommentCategorie === "N2Plus150"){
                                N2Plus150Comment.push(d)
                            }else if(d.CommentCategorie === "N2Plus50"){
                                N2Plus50Comment.push(d)
                            }
                        })
                    }


                    let FinalN2Comment = N2Comment[N2Comment.length -1] || "Empty";
                    let FinalN2Plus150Comment = N2Plus150Comment[N2Plus150Comment.length -1] || "Empty";
                    let FinalN2Plus50Comment = N2Plus50Comment[N2Plus50Comment.length -1] || "Empty";


                    res.status(200).json({success: true, N2Comment: FinalN2Comment, N2Plus150Comment: FinalN2Plus150Comment, N2Plus50Comment: FinalN2Plus50Comment})
                    
                })
                .catch(err=>{
                    console.log(err);
                    res.status(400).json("Server Error !")
                })
            }else{
                res.status(404).json("Unauthorised !") 
            } 
        }else{
            res.status(404).json("Unauthorised !")
        }
    })(req, res, next)
})

module.exports = router;