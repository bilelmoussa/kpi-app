const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);

const schema = mongoose.Schema;
const options = require('./options/machines_opt');

//create Schema
const partSchema = new schema(Joigoose.convert(options));

module.exports = n2_part = mongoose.model('n2_part', partSchema);

module.exports.get_Dates = function(callback){
	let options = [
		{
			$group: {
				_id: {week: { $isoWeek: "$Date" }, month: { $month: "$Date" }, year: { $year: "$Date" } }
			}
		},
		{
			$project: {
				_id: 1,
			}
		},
		{ $sort : { "_id.week" : 1, "_id.month": 1, "_id.year": 1 } }
	];
	n2_part.aggregate(options, callback);
}


n2_part.get_Dates((err, parts)=>{
	err ? console.log(err) :
	parts ? console.log(parts): console.log("no response");
});


module.exports.get_by_date = function(callback){
	let options  = [
		 {
        $group : {
           _id : { week: { $isoWeek: "$Date" }, month: { $month: "$Date" }, year: { $year: "$Date" } },
		   rows : { $push: "$$ROOT" },
		   workingHours_Total: { $sum: "$workingHours" },
		   actualWh_Total : { $sum: "$actualWh" },
		   Faillure_Total: { $sum: "$failureCoef" },
           count: { $sum: 1 }
        }
      },
	  { $project: { _id: 1, rows: 1, workingHours_Total: 1,  actualWh_Total: 1, Faillure_Total: 1, count: 1, Efficiency: { $divide: [ "$actualWh_Total", 168 ] }, FailRate: { $subtract: [ 1, {$divide: ["$Faillure_Total", "$count"] } ] }, PlanningEfficiency: { $divide: [ "$workingHours_Total", 168 ] }, AvgPrinting: { $divide: [ "$actualWh_Total", 7 ] }   }},
	  { $sort : { "_id.week" : 1, "_id.month": 1, "_id.year": 1 } }
	];
	
	n2_part.aggregate(options, callback);
}



module.exports.get_by_month = function(query, callback){
	let options = [
		{
			$group : {
			   _id : { week: { $isoWeek: "$Date" }, month: { $month: "$Date" }, year: { $year: "$Date" } },
			   workingHours : { $push: "$workingHours" },
			   timeAndDate: { $push: "$timeAndDate" },
			   count: { $sum: 1 }
			}
		  },
		  { $project: { _id: 1, workingHours: 1, timeAndDate: 1, count: 1 } },
		  { $match: { $and: [{"_id.week": query.week}, {"_id.month": query.month}, {"_id.year": query.year} ] } },
		  { $sort : { "_id.week" : -1, "_id.month": -1, "_id.year": -1 } }
	]

	n2_part.aggregate(options, callback);
}

let query = {week: 1, month: 1, year: 2019};

/*
n2_part.get_by_month(query, (err, parts)=>{
	if(err){
		console.log(err);
	}
	if(parts){
		console.log("parts :", parts);	
	}
})
*/
