const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);

const schema = mongoose.Schema;
const options = require('./options/machines_opt');

//create Schema
const partSchema = new schema(Joigoose.convert(options));

module.exports = n2_part = mongoose.model('n2_part', partSchema);



module.exports.get_by_date = function(callback){
	let options  = [
		 {
        $group : {
           _id : { week: { $isoWeek: "$Date" }, month: { $month: "$Date" }, year: { $year: "$Date" } },
		   rows : { $push: "$$ROOT" },
           count: { $sum: 1 }
        }
      },
	  { $sort : { "_id.week" : -1, "_id.month": -1, "_id.year": -1 } }
	];
	
	n2_part.aggregate(options, callback);
}
