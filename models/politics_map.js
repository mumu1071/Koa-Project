'use strict'

const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

/**
 * 政治风险
 * @type {module:mongoose.Schema<Document, Model<any, any>, undefined>}
 */
const PoliticsMapSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        select: false
    },
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,

})
const politicsMapSchema = mongoose.model('PoliticsMapSchema', PoliticsMapSchema, 'map_politics')

module.exports = politicsMapSchema
