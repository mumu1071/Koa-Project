'use strict'

const BaseController = require('./base-controller')

class MapController extends BaseController {

    constructor() {
        super()
        this.region = this.region.bind(this)

    }

    async region(ctx, next) {
        let result = 'aa'
        this._success(ctx, result)
    }
}

const mapController = new MapController()

module.exports = mapController