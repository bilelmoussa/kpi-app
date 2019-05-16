
const update_user_role = function(req, res, next,err,user,model){
    
    if (err) { return next(err); }
    if (!user) { return res.json('Unauthorised'); }
    if(user.role == "admin"){
        let user_name = {user_name: req.body.user_name};
        let role = {role: req.body.role};

        model.updateOne(user_name,role)
        .then(user => res.status(200).json({success: true}))
        .catch(err=>{console.log(err); res.status(400).json(err)});
       
    }else{
      return res.json('Unauthorised')
    }
}

module.exports = update_user_role;

