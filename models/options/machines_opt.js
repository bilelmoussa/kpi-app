
const Joi = require('joi');


let options = Joi.object({
    printedPart: Joi.string().required(),
    workingHours: Joi.number().required(),
    timeAndDate: Joi.date().required(),
    finishingTime: Joi.date().required(),
    dayNumber: Joi.string().required(),
    failureCoef: Joi.string().required(),
    actualWh: Joi.number().required(),
    Remarks: Joi.string().allow(''),
	Date: Joi.date().required(),
    created_at: Joi.date().default(Date.now()).required(),
    update_at: Joi.date().default(Date.now()).required(),
	client_id: Joi.string().required(),
})

module.exports = options;