


const delete_auth = function(req, res, next,err,user,model){
    if (err) { return next(err); }
    if (!user) { return res.status(401).json('Unauthorised'); }
    if(user.role == "admin" || user.role == "write"){
     let id =  req.body.id;
	model.findOneAndDelete(id).then(() => { res.json({sucess:true, msg:'part is deleted'}) }).catch(err => {console.log(err); res.json({success: false})});
    }else{
      return res.status(401).json('Unauthorised')
    }
}

module.exports = delete_auth;