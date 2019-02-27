


const delete_auth = function(req, res, next,err,user,model){
    if (err) { return next(err); }
    if (!user) { return res.json('Unauthorised'); }
    if(user.role == "admin" || user.role == "write"){
        let query = {id: req.body.id};
        model.delete(query,err).then(() => res.json({sucess:true, msg:'part is deleted'})).catch(err=>{console.log(err); res.json(err)});
    }else{
      return res.json('Unauthorised')
    }
}

module.exports = delete_auth;