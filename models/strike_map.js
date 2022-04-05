'use strict'

const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

/**
 * 罢工风险-未完成
 * @type {module:mongoose.Schema<Document, Model<any, any>, undefined>}
 */
const StrikeMapSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        select: false
    },
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,

})
const strikeMapSchema = mongoose.model('StrikeMapSchema', StrikeMapSchema, 'map_strike')

module.exports = strikeMapSchema
