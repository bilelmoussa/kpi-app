const isEmpty = require('../../validations/isEmpty');
const valRemarks = require('../../validations/valRemarks')

const update_auth = function(req, res, next,err,user,model,query){
    if (err) { return next(err); }
    if (!user) { return res.json('Unauthorised'); }
    if(user.role == "admin" || user.role == "write"){
		let option = {upsert: true, 'new': true,};
        let id = req.body.id;
		
		if(typeof req.body.query === 'object' && Object.values(req.body.query).length < 1){
			res.status(400).json({success: false, err: "0 field updated !"})		
		}else if(!valRemarks(req.body.query) && Object.keys(req.body.query)[0] === "Remarks"){
			model.findOneAndUpdate(id,query,option).then(data => {res.json(data)}).catch(err=>{console.log(err); res.status(400).json('Server err')});
		}else if(!isEmpty(req.body.query)){
			model.findOneAndUpdate(id,query,option).then(data => {res.json(data)}).catch(err=>{console.log(err); res.status(400).json('Server err')});
		}else{
			res.status(400).json({success: false, err: "field are empty !"})
		}
    }else{
      return res.status(401).json('Unauthorised')
    }
}

module.exports = update_auth;