
const update_user_role = function(req, res, next,err,user,model,query,model){
    
    if (err) { return next(err); }
    if (!user) { return res.json('Unauthorised'); }
    if(user.role == "admin"){
        let password = req.body.password;
        let user_name = req.body.user_name;
        User.getUserByUsername(user_name, (err, user)=>{

            if(err){
                console.log(`Error: `, err);
                return res.json({success: false, msg: err});
            }else if(!user){
                return res.json({success: false, msg: 'user not found'});
            }else{

                model.camparePassword(password, user.password, (err, isMatch) => {
                    if(err){
                        console.log(`Error: `, err);
                        return res.json({success: false, msg:err.message})
                    }else{
                    if(isMatch){
                        let id = req.body.id 
                        model.updateOne(id,query,err, user).then(user => res.json(user)).catch(err=>{console.log(err); res.json(err)});

                    }else{
                        return res.json({success: false, msg: 'wrong password'});
                    }
                    }
                })

            }    
        })
    
    }else{
      return res.json('Unauthorised')
    }
}

module.exports = update_user_role;