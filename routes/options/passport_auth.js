

const auth = (req,res,next,err,user,model)=>{
    if (err) { return next(err); }
    if (!user) { return res.json('Unauthorised'); }
    if(user){
      model.find()
      .then(parts => {res.json({success: true ,parts: parts})})
      .catch(err => {res.status(400).json({errors: err})});
    }else{
      return res.status(401).json('Unauthorised')
    }
}

module.exports = auth;