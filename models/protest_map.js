'use strict'

const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

const ProtestMapSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        select: false
    },
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,

})
const protestMapSchema = mongoose.model('ProtestMapSchema', ProtestMapSchema, 'map_protest')

module.exports = protestMapSchema
