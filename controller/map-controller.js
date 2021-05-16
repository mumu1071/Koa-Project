'use strict'

const BaseController = require('./base-controller')
const TerroristMapSchema = require('../models/terrorist_map')
const ProtestMapSchema = require('../models/protest_map')

class MapController extends BaseController {

    constructor() {
        super()
        this.terrorist = this.terrorist.bind(this)
        this.protest = this.protest.bind(this)
    }

    async terrorist(ctx, next) {
        let result = await TerroristMapSchema.find({}).limit(10000).exec();
        this._success(ctx, result)
    }

    async protest(ctx, next) {
        let result = await ProtestMapSchema.find({}).limit(10000).exec();
        this._success(ctx, result)
    }

}

const mapController = new MapController()

module.exports = mapController