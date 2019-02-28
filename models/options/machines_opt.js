
const Joi = require('joi');


let options = Joi.object({
    printedPart: Joi.string().required(),
    workingHours: Joi.string().required(),
    timeAndDate: Joi.date().required(),
    finishingTime: Joi.date().required(),
    dayNumber: Joi.number().required(),
    failureCoef: Joi.number().min(0).max(1).required(),
    actualWh: Joi.string().required(),
    Remarks: Joi.string(),
	Date: Joi.date().required(),
    created_at: Joi.date().default(Date.now()).required(),
    update_at: Joi.date().default(Date.now()).required()
})

module.exports = options;