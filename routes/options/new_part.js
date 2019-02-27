const validate_date = require('../../validations/date_validation');

function new_parts(req){
    const new_part ={
        name: req.body.name,
        working_hours: req.body.working_hours,
        starting_date: validate_date(req.body.starting_date),
        finishing_date: validate_date(req.body.finishing_date),
        date:validate_date(req.body.date),
        failure_coef: req.body.failure_coef,
        actual_wh: req.body.actual_wh,
        remarks: req.body.remarks,
    }
    return new_part;
}

module.exports = new_parts;