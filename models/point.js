'use strict'

const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        select: false
    },
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,

})
const pointSchema = mongoose.model('PointSchema', PointSchema, 'RegionPoint')

module.exports = pointSchema
