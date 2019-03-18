const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);

const schema = mongoose.Schema;
const options = require('./options/machines_opt');

//create Schema
const partSchema = new schema(Joigoose.convert(options));

module.exports = n2_plus_150_part = mongoose.model('n2_plus_150_part', partSchema);

module.exports.get_years = function(callback){
	let options = [
		{
			$group: {
				_id:  { year: { $year: "$Date" } }
			}
		},
		{
			$project: {
				_id: 1,
			}
		},
		{ $sort : { "_id.year" : -1 } }
	];
	n2_plus_150_part.aggregate(options, callback);
}

module.exports.get_months = function(year, callback){
	let options = [
		{
			$group: {
				_id:  { year: { $year: "$Date" }, month: { $month: "$Date" } }
			}
		},
		{
			$project: {
				_id: 1,
			}
		},
		{ $match: {"_id.year": year} },
		{ $sort : { "_id.year": -1, "_id.month" : -1 } }
	];
	n2_plus_150_part.aggregate(options, callback);
}

module.exports.get_weeks = function(year, month, callback){
	let options = [
		{
			$group: {
				_id:  { year: { $year: "$Date" }, month: { $month: "$Date" }, week: { $isoWeek: "$Date" } }
			}
		},
		{
			$project: {
				_id: 1,
			}
		},
		{ $match: { "_id.month": year, "_id.month": month  } },
		{ $sort : { "_id.year": -1, "_id.month" : -1, "_id.week": -1 } }
	];

	n2_plus_150_part.aggregate(options, callback);
}

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
	 { $sort : { "_id.week" : -1, "_id.month": -1, "_id.year": -1 } }
   ];
   
   n2_plus_150_part.aggregate(options, callback);
}

module.exports.getWeekChartValues = function(year, month, week, callback){
	let options = [
		{
			$group : {
			   _id : { year: { $year: "$Date" }, month: { $month: "$Date" }, week: { $isoWeek: "$Date" } },
			   workingHours : { $push: "$workingHours" },
			   Date: { $push: "$Date" },
			   count: { $sum: 1 }
			}
		  },
		  { $project: { _id: 1, workingHours: 1, Date: 1, count: 1 } },
		  { $match: { $and: [{"_id.week": week}, {"_id.month": month}, {"_id.year": year} ] } },
		  { $sort : { "_id.year": -1, "_id.month": -1,  "_id.week" : -1,   } }
	]

	n2_plus_150_part.aggregate(options, callback);
}

module.exports.getMonthChartValues = function(year, month, callback){
	let options = [
		{
			$group : {
			   _id : { year: { $year: "$Date" }, month: { $month: "$Date" }, week: { $isoWeek: "$Date" } },
			   workingHours : { $push: "$workingHours" },
			   timeAndDate: { $push: "$timeAndDate" },
			   count: { $sum: 1 }
			}
		  },
		  { $project: { _id: 1, workingHours: 1, timeAndDate: 1, count: 1 } },
		  { $match: { $and: [{"_id.month": month}, {"_id.year": year} ] } },
		  { $sort : { "_id.year": -1, "_id.month": -1,  "_id.week" : -1,   } }
	]

	n2_plus_150_part.aggregate(options, callback);
}

module.exports.getYearChartValues = function(year, callback){
	let options = [
		{
			$group : {
			   _id : { year: { $year: "$Date" }, month: { $month: "$Date" }, week: { $isoWeek: "$Date" } },
			   workingHours : { $push: "$workingHours" },
			   timeAndDate: { $push: "$timeAndDate" },
			   count: { $sum: 1 }
			}
		  },
		  { $project: { _id: 1, workingHours: 1, timeAndDate: 1, count: 1 } },
		  { $match: { $and: [ {"_id.year": year} ] } },
		  { $sort : { "_id.year": -1, "_id.month": -1,  "_id.week" : -1,   } }
	]

	n2_plus_150_part.aggregate(options, callback);
}