
function new_parts(req){
    const new_part ={
        printedPart: req.body.printedPart,
        workingHours: req.body.workingHours,
        timeAndDate: req.body.timeAndDate,
        finishingTime: req.body.finishingTime,
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