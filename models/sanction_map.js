'use strict'

const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

/**
 * 制裁风险
 * @type {module:mongoose.Schema<Document, Model<any, any>, undefined>}
 */
const SanctionMapSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        select: false
    },
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,

})
const sanctionMapSchema = mongoose.model('SanctionMapSchema', SanctionMapSchema, 'map_sanction')

module.exports = sanctionMapSchema
