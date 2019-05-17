const express = require('express');
const router = express.Router();
const passport = require('passport');

const N2_Part = require('../../models/n2');
const N2_plus_50_Part = require('../../models/n2_plus_50');
const N2_plus_150_Part = require('../../models/n2_plus_150');


router.get('/stat/:year/', (req, res, next)=>{
    
	passport.authenticate('jwt', {session: false}, function(err, user){
        
		if (err) { return next(err); }
		if (!user) { return res.json('Unauthorised user not found !'); }
		if(user){
			let year = parseInt(req.params.year);
            let finalData = [];

            function getTimeSum(total, num) {
                return total + num.TimeEfficiency;
            }

            function getFailSum(total, num) {
                return total + num.FailRate;
            }

            function getFilamantSum(total, num) {
                return total + num.FilamantComsumption;
            }

            function getTemplateSum(total, num) {
                return total + num.TemplateEfficiency;
            }

            let options = [
                {
                    $group : {
                       _id : { year: { $year: "$timeAndDate" }, month: { $month: "$timeAndDate" }, week: { $isoWeek: "$timeAndDate" } },
                       rows : { 
                           $push:{
                               _id: "$_id",
                               printedPart: "$printedPart",
                               workingHours: "$workingHours",
                               timeAndDate: "$timeAndDate",
                               finishingTime: "$finishingTime",
                               failureCoef: "$failureCoef",
                               actualWh: "$actualWh",
                               weight: "$weight",
                               template: "$template",
                               Remarks: "$Remarks",
                               client_id: "$client_id"
                           } 
                        },
                       workingHours_Total: { $sum: "$workingHours" },
                       actualWh_Total : { $sum: "$actualWh" },
                       Faillure_Total: { $sum: "$failureCoef" },
                       FilamantComsumption: {$sum: "$weight"},
                       Template_Total: { $sum: "$template" },
                       count: { $sum: 1 }
                    }
                  },
                  { $project: { _id: 1, rows: 1, workingHours_Total: 1, Template_Total: 1,  actualWh_Total: 1, Faillure_Total: 1,  count: 1,  TimeEfficiency: { $divide: [ "$actualWh_Total", 168 ] },  FailRate: { $subtract: [ 1, {$divide: ["$Faillure_Total", "$count"] } ] },  FilamantComsumption: 1 }  },
                  { $match: { $and: [ {"_id.year": year} ] } },
                  { $sort : { "_id.year": -1, "_id.month": -1,  "_id.week" : -1,   } }
            ]

            Promise.all([
                N2_Part.aggregate(options),
                N2_plus_150_Part.aggregate(options),
                N2_plus_50_Part.aggregate(options)
            ])
            .then(data => {
                data.forEach((d)=>{
                   if(!d.length < 1){

                       const data_ =  d[1] || d[0];

                       
                       if(data_.Template_Total === 0){
                        data_.Template_Total = data_.workingHours_Total;
                        }
            
                        data_.TemplateEfficiency = 1 - (data_.workingHours_Total/data_.Template_Total);

                        data_.rows.forEach((row, i)=>{
                            if(row.template === null || row.template === undefined || row.template === 0){
                                row.template = row.workingHours
                            }
                        })
                        
                        

                        let new_data = {
                            TimeEfficiency: data_.TimeEfficiency || 0,
                            FailRate: data_.FailRate || 0,
                            FilamantComsumption: data_.FilamantComsumption || 0,
                            TemplateEfficiency: data_.TemplateEfficiency || 0
                        };
                        

                        finalData.push(new_data);   
                   }
                })


               let res_data = {
                    TimeEfficiency: Number(finalData.reduce(getTimeSum, 0)) / 3  || 0,
                    FailRate: Number(finalData.reduce(getFailSum, 0)) / 3 || 0,
                    FilamantComsumption: Number(finalData.reduce(getFilamantSum, 0)) || 0,
                    TemplateEfficiency: Number(finalData.reduce(getTemplateSum, 0)) / 3 || 0,
               }

                
                res.status(200).json(res_data);    
            })
            . catch(err => res.status(400).json({errors: err}))
                
		}else{
			return res.status(401).json('Unauthorised')
		}
	})(req, res, next)
})



module.exports = router;




