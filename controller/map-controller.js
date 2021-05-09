'use strict'

const BaseController = require('./base-controller')

const MongoDB = require('./util/mongo-db')

class MapController extends BaseController {

    constructor() {
        super()
        this.region = this.region.bind(this)
    }

    async region(ctx, next) {
        let result = await MongoDB().findAll("map", {});
        console.info(result);
        this._success(ctx, result)
    }
}

const mapController = new MapController()

module.exports = mapController