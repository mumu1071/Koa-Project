'use strict'

const mapController = require('../controller/map-controller')

const userRouter = (router) => {
    router.post('/api/map/region', mapController.region)
};

module.exports = userRouter