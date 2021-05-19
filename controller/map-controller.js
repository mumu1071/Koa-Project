'use strict'
const async = require("async")

const BaseController = require('./base-controller')
const TerroristMapSchema = require('../models/terrorist_map')
const ProtestMapSchema = require('../models/protest_map')
const mcache = require('../core/cache')

class MapController extends BaseController {

    constructor() {
        super()
        this.terrorist = this.terrorist.bind(this)
        this.protest = this.protest.bind(this)
        this.region = this.region.bind(this)
        this.latest = this.latest.bind(this)
        this.getData = this.getData.bind(this)
    }

    async terrorist(ctx, next) {
        let result = await TerroristMapSchema.find({}).limit(10000).exec();
        this._success(ctx, result)
    }

    async protest(ctx, next) {
        let result = await ProtestMapSchema.find({}).limit(10000).exec();
        this._success(ctx, result)
    }

    async region(ctx, next) {
        let result = mcache.get('region')
        if (result && result.length > 0) {
            this._success(ctx, result)
            return
        }
        const tempResult = await this.getData(10000, 10000)
        if (tempResult && tempResult.length > 0) {
            mcache.set('region', tempResult)
            this._success(ctx, tempResult)
            return
        }
        this._success(ctx, [])
    }

    async latest(ctx, next) {
        let result = mcache.get('latest')
        if (result && result.length > 0) {
            this._success(ctx, result)
            return
        }
        const tempResult = await this.getData(40, 60)
        if (tempResult && tempResult.length > 0) {
            mcache.set('latest', tempResult)
            this._success(ctx, tempResult)
            return
        }
        this._success(ctx, [])
    }


    async getData(protestLimit, terroristLimit) {
        const requestPromise = new Promise((resolve, reject) => {
            async.parallel([
                function (callback) {
                    ProtestMapSchema.find({}, null, {limit: protestLimit}, function (err, res) {
                        callback(null, res)
                    })
                },
                function (callback) {
                    TerroristMapSchema.find({}, null, {limit: terroristLimit}, function (err, res) {
                        callback(null, res)
                    })
                },
            ], function (err, res) {
                return resolve(res)
            })
        })
        const res = await requestPromise;
        const result = []
        if (res && res.length > 1) {
            result.push(...res[0])
            result.push(...res[1])
        }
        return result
    }
}

const mapController = new MapController()

module.exports = mapController