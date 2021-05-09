'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PointSchema = new Schema({
    _id: Schema.Types.ObjectId,
    type: String,
    properties: {
        eventid: Number,
        city: String
    },
    geometry: {
        type: String,
        coordinates: {type: [Number], index: '2dsphere'}
    }
})
const pointSchema = mongoose.model('PointSchema', PointSchema, 'RegionPoint')

module.exports = pointSchema
