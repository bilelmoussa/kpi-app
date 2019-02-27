


const update_auth = function(req, res, next,err,user,model,query){
    if (err) { return next(err); }
    if (!user) { return res.json('Unauthorised'); }
    if(user.role == "admin" || user.role == "write"){
        let id = req.body.id 
        model.updateOne(id,query,err, part).then(part => res.json(part)).catch(err=>{console.log(err); res.json(err)});
    }else{
      return res.json('Unauthorised')
    }
}

module.exports = update_auth;