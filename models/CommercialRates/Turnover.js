const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);
const Joi = require('joi');

const schema = mongoose.Schema;

let options = Joi.object({
    TurnoverValue: Joi.number().required(),
    created_at: Joi.date().default(Date.now()).required(),
    update_at: Joi.date().default(Date.now()).required()
});

const TurnoverSchema = new schema(Joigoose.convert(options));

module.exports = Turnover = mongoose.model('Turnover', TurnoverSchema);