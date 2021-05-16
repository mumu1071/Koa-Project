'use strict'

const mapController = require('../controller/map-controller')

const mapRouter = (router) => {
    //袭击
    router.post('/api/map/terrorist', mapController.terrorist)
    //抗议
    router.post('/api/map/protest', mapController.protest)
    //全部
    router.post('/api/map/region', mapController.region)
};

module.exports = mapRouter