'use strict'

const mongoose = require('mongoose')
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

const TerroristMapSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        select: false
    },
    any: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,

})

const terroristMapSchema = mongoose.model('TerroristMapSchema', TerroristMapSchema, 'map_terrorist')

module.exports = terroristMapSchema
