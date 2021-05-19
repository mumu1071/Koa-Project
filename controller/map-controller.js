'use strict'

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
        let result = []
        result = mcache.get('region')
        if (result && result.length > 0) {
            this._success(ctx, result)
            return
        }
        result = []
        let resultProtest = await ProtestMapSchema.find({}).limit(10000).exec();
        let resultTerrorist = await TerroristMapSchema.find({}).limit(10000).exec();
        result.push(...resultProtest)
        result.push(...resultTerrorist)
        mcache.set('region', result)
        this._success(ctx, result)
    }

    async latest(ctx, next) {
        let result = []
        result = mcache.get('latest')
        if (result && result.length > 0) {
            this._success(ctx, result)
            return
        }
        result = []
        let resultProtest = await ProtestMapSchema.find().limit(40).exec();
        let resultTerrorist = await TerroristMapSchema.find().limit(60).exec();
        result.push(...resultProtest)
        result.push(...resultTerrorist)
        mcache.set('latest', result)
        this._success(ctx, result)
    }

}

const mapController = new MapController()

module.exports = mapController