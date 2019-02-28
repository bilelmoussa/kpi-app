


const write_auth = (req, res, next,err,user,model,options)=>{
    if (err) { return next(err); }
    if (!user) { return res.status(401).json('Unauthorised'); }
    if(user.role == "admin" || user.role == "write"){
      const newPart = new model(options(req));
      newPart.save()
	  .then(part => {res.json({success: true, part: part})})
	  .catch(err=>{console.log(err); res.status(400).json({success: false, errors: err})});
    }else{
      return res.status(401).json('Unauthorised')
    }
}

module.exports = write_auth;