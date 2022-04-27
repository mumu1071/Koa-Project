'use strict'
const async = require("async")

const BaseController = require('./base-controller')
const TerroristMapSchema = require('../models/terrorist_map')
const ProtestMapSchema = require('../models/protest_map')
const PoliticsMapSchema = require('../models/politics_map')
const EmbargoMapSchema = require('../models/embargo_map')
const SanctionMapSchema = require('../models/sanction_map')
const StrikeMapSchema = require('../models/strike_map')
const mcache = require('../core/cache')

class MapController extends BaseController {

    constructor() {
        super()
        this.terrorist = this.terrorist.bind(this)
        this.protest = this.protest.bind(this)
        this.politics = this.politics.bind(this)
        this.strike = this.strike.bind(this)
        this.embargo = this.embargo.bind(this)
        this.sanction = this.sanction.bind(this)

        this.region = this.region.bind(this)
        this.latest = this.latest.bind(this)
        this.getData = this.getData.bind(this)
    }

    async terrorist(ctx, next) {
        let result = await TerroristMapSchema.find({}).limit(10000).sort({"properties.dateTime": -1}).exec();
        this._success(ctx, result)
    }

    async protest(ctx, next) {
        let result = await ProtestMapSchema.find({}).limit(10000).sort({"properties.dateTime": -1}).exec();
        this._success(ctx, result)
    }

    async politics(ctx, next) {
        let result = await PoliticsMapSchema.find({}).limit(10000).sort({"properties.dateTime": -1}).exec();
        this._success(ctx, result)
    }

    async strike(ctx, next) {
        let result = await StrikeMapSchema.find({}).limit(10000).sort({"properties.dateTime": -1}).exec();
        this._success(ctx, result)
    }

    async embargo(ctx, next) {
        let result = await EmbargoMapSchema.find({}).limit(10000).sort({"properties.dateTime": -1}).exec();
        this._success(ctx, result)
    }

    async sanction(ctx, next) {
        let result = await SanctionMapSchema.find({}).limit(10000).sort({"properties.dateTime": -1}).exec();
        this._success(ctx, result)
    }

    async region(ctx, next) {
        let result = mcache.get('region')
        if (result && result.length > 0) {
            this._success(ctx, result)
            return
        }
        const projection = {'_id': 0, 'properties.scite': 0}
        const tempResult = await this.getData(projection, 2000)
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
        const tempResult = await this.getData(null)
        if (tempResult && tempResult.length > 0) {
            mcache.set('latest', tempResult)
            this._success(ctx, tempResult)
            return
        }
        this._success(ctx, [])
    }


    async getData(projection, limit = 15) {
        const requestPromise = new Promise((resolve, reject) => {
            async.parallel([
                function (callback) {
                    ProtestMapSchema.find({}, projection, {
                        limit: limit,
                        sort: {"properties.dateTime": -1}
                    }, function (err, res) {
                        callback(null, res)
                    })
                },
                function (callback) {
                    TerroristMapSchema.find({}, projection, {
                        limit: limit,
                        sort: {"properties.dateTime": -1}
                    }, function (err, res) {
                        callback(null, res)
                    })
                },
                function (callback) {
                    PoliticsMapSchema.find({}, projection, {
                        limit: limit,
                        sort: {"properties.dateTime": -1}
                    }, function (err, res) {
                        callback(null, res)
                    })
                },
                function (callback) {
                    EmbargoMapSchema.find({}, projection, {
                        limit: limit,
                        sort: {"properties.dateTime": -1}
                    }, function (err, res) {
                        callback(null, res)
                    })
                },
                function (callback) {
                    SanctionMapSchema.find({}, projection, {
                        limit: limit,
                        sort: {"properties.dateTime": -1}
                    }, function (err, res) {
                        callback(null, res)
                    })
                },
                function (callback) {
                    StrikeMapSchema.find({}, projection, {
                        limit: limit,
                        sort: {"properties.dateTime": -1}
                    }, function (err, res) {
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
            result.push(...res[2])
            result.push(...res[3])
            result.push(...res[4])
            result.push(...res[5])
        }
        return result
    }
}

const mapController = new MapController()

module.exports = mapController