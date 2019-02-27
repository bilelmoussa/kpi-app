


const write_auth = (req, res, next,err,user,model,options)=>{
    if (err) { return next(err); }
    if (!user) { return res.json('Unauthorised'); }
    if(user.role == "admin" || user.role == "write"){
      const newPart = new model(options(req));
      newPart.save(err, part).then(part => res.json(part)).catch(err=>{console.log(err); res.json(err)});
    }else{
      return res.json('Unauthorised')
    }
}

module.exports = write_auth;