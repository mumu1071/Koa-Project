'use strict'

const BaseController = require('./base-controller')
const PointSchema = require('../models/point')

class MapController extends BaseController {

    constructor() {
        super()
        this.region = this.region.bind(this)
    }

    async region(ctx, next) {
        let result = await PointSchema.find({}).limit(20).exec();
        console.info(result);
        this._success(ctx, result)
    }

}

const mapController = new MapController()

module.exports = mapController