'use strict'

const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

/**
 * 禁运风险
 * @type {module:mongoose.Schema<Document, Model<any, any>, undefined>}
 */
const EmbargoMapSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        select: false
    },
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,

})
const embargoMapSchema = mongoose.model('EmbargoMapSchema', EmbargoMapSchema, 'map_embargo')

module.exports = embargoMapSchema
