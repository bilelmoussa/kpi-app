const express = require('express');
const router = express.Router();
const passport = require('passport');

//parts options
const options = require('../options/new_part');

//machines models
const N2_Part = require('../../models/n2');

//get custom authentication 
const auth = require('../options/passport_auth');
const write_auth = require('../options/write_auth');
const update_auth = require('../options/update_auth');
const delete_auth = require('../options/delete_auth');


//create new part to n2
router.post('/saveparts',(req, res, next)=>{
  passport.authenticate('jwt', {session: false}, function(err, user){
    write_auth(req, res, next,err,user,N2_Part,options);
  })(req, res, next)
});

//update part to n2
router.put('/updateparts',(req, res, next)=>{
  let query = req.body.query;
  passport.authenticate('jwt', {session: false}, function(err, user){
    update_auth(req, res, next,err,user,N2_Part, query);
  })(req, res, next)
});

//delete part from n2
router.delete('/deleteparts',(req, res, next)=>{
  passport.authenticate('jwt', {session: false}, function(err, user){
    delete_auth(req, res, next,err,user,N2_Part);
  })(req, res, next)
});

router.get('/findparts', (req, res, next)=>{
	passport.authenticate('jwt', {session: false}, function(err, user){
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			N2_Part.get_by_date((err, parts)=>{
				if(err){
					res.status(400).json({errors: err});
				}
				if(parts){
					res.json({success: true, parts: parts})
				}
			})
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
});

//get Years
router.get('/years', (req, res, next)=>{
	passport.authenticate('jwt', {session: false}, function(err, user){
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			N2_Part.get_years((err, years)=>{
				if(err){
					res.status(400).json({errors: err});
				}
				if(years){
					let YEARS_ = []
					years.forEach((year, i)=>{
						YEARS_.push(year._id.year)
					});
					res.json({success: true, years: YEARS_})
				}
			})
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
});

//get Months Of Years
router.get('/months/:year', (req, res, next)=>{
	passport.authenticate('jwt', {session: false}, function(err, user){
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			let year = parseInt(req.params.year);
			N2_Part.get_months(year, (err, months)=>{
				if(err){
					res.status(400).json({errors: err});
				}
				if(months){
					let Months_ = [];
					months.forEach((month, i)=>{
						Months_.push(month._id.month)
					});
					res.json({success: true, months: Months_})
				}
			})
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
})

//get Weeks by YEAR AND MONTH 
router.get('/weeks/:year/:month', (req, res, next)=>{
	passport.authenticate('jwt', {session: false}, function(err, user){
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			let year = parseInt(req.params.year);
			let month = parseInt(req.params.month);
			N2_Part.get_weeks(year, month, (err, weeks)=>{
				if(err){
					res.status(400).json({errors: err});
				}
				if(weeks){
					let Weeks_ = [];
					weeks.forEach((week, i)=>{
						Weeks_.push(week._id.week)
					});
					res.json({success: true, weeks: Weeks_})
				}
			})
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
})

//GET DATA FOR WEEK CHART !
router.get('/week_chart/:year/:month/:week', (req, res, next)=>{
	passport.authenticate('jwt', {session: false}, function(err, user){
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			let year = parseInt(req.params.year);
			let month = parseInt(req.params.month);
			let week = parseInt(req.params.week);
			N2_Part.getWeekChartValues(year, month, week, (err, data)=>{
				if(err){
					res.status(400).json({errors: err});
				}
				if(data){
					res.json({success: true, data: data})
				}
			})
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
})


//GET DATA FOR MONTH CHART !
router.get('/month_chart/:year/:month', (req, res, next)=>{
	passport.authenticate('jwt', {session: false}, function(err, user){
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			let year = parseInt(req.params.year);
			let month = parseInt(req.params.month);
			N2_Part.getMonthChartValues(year, month, (err, data)=>{
				if(err){
					res.status(400).json({errors: err});
				}
				if(data){
					res.json({success: true, data: data})
				}
			})
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
})

//GET DATA FOR YEAR CHART !
router.get('/year_chart/:year', (req, res, next)=>{
	passport.authenticate('jwt', {session: false}, function(err, user){
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			let year = parseInt(req.params.year);
			N2_Part.getYearChartValues(year, (err, data)=>{
				if(err){
					res.status(400).json({errors: err});
				}
				if(data){
					res.json({success: true, data: data})
				}
			})
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
})

module.exports = router;

