const mongoose = require('mongoose');
const Joigoose = require('joigoose')(mongoose);
const Joi = require('joi');

const schema = mongoose.Schema;

let options = Joi.object({
    CommentValue: Joi.string().required(),
    CommentCategorie:  Joi.string().valid("N2", "N2Plus150", "N2Plus50").required(),
    created_at: Joi.date().default(Date.now()).required(),
    update_at: Joi.date().default(Date.now()).required()
});

const CommentSchema = new schema(Joigoose.convert(options));

module.exports = Comment = mongoose.model('Comment', CommentSchema);