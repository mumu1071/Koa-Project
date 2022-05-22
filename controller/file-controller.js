'use strict'
const async = require("async")

const BaseController = require('./base-controller')

/**
 * 文件存储和获取
 */
class FileController extends BaseController {

    constructor() {
        super()
        this.saveFile = this.saveFile.bind(this)
        this.getFile = this.getFile.bind(this)
    }

    async saveFile(ctx, next) {

        this._success(ctx, result)
    }

    async getFile(ctx, next) {

        this._success(ctx, result)
    }
}

const fileController = new FileController()

module.exports = fileController