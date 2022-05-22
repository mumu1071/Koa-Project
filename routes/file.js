'use strict'

const fileController = require('../controller/file-controller')

const policyRouter = (router) => {
    router.get('/api/file/save', fileController.saveFile())
    router.get('/api/file/get', fileController.getFile())
};

module.exports = policyRouter
