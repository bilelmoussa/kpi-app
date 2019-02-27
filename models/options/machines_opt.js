
const Joi = require('joi');


let options = Joi.object({
    name: Joi.string().required(),
    working_hours: Joi.number().required(),
    starting_date: Joi.date().required(),
    finishing_date: Joi.date().required(),
    date: Joi.date().required(),
    failure_coef: Joi.number().min(0).max(1).required(),
    actual_wh: Joi.number().required(),
    remarks: Joi.string(),
    created_at: Joi.date().default(Date.now()).required(),
    update_at: Joi.date().default(Date.now()).required()
})

module.exports = options;