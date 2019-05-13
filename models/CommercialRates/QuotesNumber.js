const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);
const Joi = require('joi');

const schema = mongoose.Schema;

let options = Joi.object({
    QuotesNumberValue: Joi.number().required(),
    created_at: Joi.date().default(Date.now()).required(),
    update_at: Joi.date().default(Date.now()).required()
});

const QuotesNumberSchema = new schema(Joigoose.convert(options));

module.exports = QuotesNumber = mongoose.model('QuotesNumber', QuotesNumberSchema);


