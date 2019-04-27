<<<<<<< HEAD
=======
const validate_date = require("../../validations/date_validation");
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779

function new_parts(req){
    const new_part ={
        printedPart: req.body.printedPart,
        workingHours: req.body.workingHours,
<<<<<<< HEAD
        timeAndDate: req.body.timeAndDate,
        finishingTime: req.body.finishingTime,
=======
        timeAndDate: validate_date(req.body.timeAndDate),
        finishingTime: validate_date(req.body.finishingTime),
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
		failureCoef: req.body.failureCoef,
        actualWh: req.body.actualWh,
        weight:  req.body.weight,
        template: req.body.template,
        Remarks: req.body.Remarks,
		client_id: req.body.client_id,
    }
    return new_part;
}

module.exports = new_parts;