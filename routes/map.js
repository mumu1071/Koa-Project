'use strict'

const mapController = require('../controller/map-controller')

const userRouter = (router) => {
    router.post('/api/map/terrorist', mapController.terrorist)
    router.post('/api/map/protest', mapController.protest)
};

module.exports = userRouter