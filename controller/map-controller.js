'use strict'

const BaseController = require('./base-controller')

class MapController extends BaseController {

    constructor() {
        super()
        this.region = this.region.bind(this)
    }

    async region(ctx, next) {
        let result = {
            url: 'http://gank.io/api/data/Android/10/1'
        };
        this._success(ctx, result)
    }
}

const mapController = new MapController()

module.exports = mapController