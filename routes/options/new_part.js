const validate_date = require('../../validations/date_validation');
 
function new_parts(req){
    const new_part ={
        printedPart: req.body.printedPart,
        workingHours: req.body.workingHours,
        timeAndDate: validate_date(req.body.timeAndDate),
        finishingTime: validate_date(req.body.finishingTime),
		dayNumber: req.body.dayNumber,
		failureCoef: req.body.failureCoef,
		actualWh: req.body.actualWh,
        Remarks: req.body.Remarks,
		Date:validate_date(req.body.Date),
		client_id: req.body.client_id,
    }
    return new_part;
}

module.exports = new_parts;