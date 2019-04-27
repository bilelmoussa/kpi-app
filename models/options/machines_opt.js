const Joi = require('joi');


let options = Joi.object({
    printedPart: Joi.string().required(),
    workingHours: Joi.number().required(),
    timeAndDate: Joi.date().required(),
    finishingTime: Joi.date().required(),
    failureCoef: Joi.number().required(),
    actualWh: Joi.number().required(),
<<<<<<< HEAD
    weight: Joi.number().required(),
    template: Joi.number().required(),
=======
    weight: Joi.string().required(),
    template: Joi.string().required(),
>>>>>>> db856b56b2962c830cd56d69f13a13c8fd4c7779
    Remarks: Joi.string().allow(''),
    created_at: Joi.date().default(Date.now()).required(),
    update_at: Joi.date().default(Date.now()).required(),
	client_id: Joi.string().required(),
})

module.exports = options;