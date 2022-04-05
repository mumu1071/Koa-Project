'use strict'

const mapController = require('../controller/map-controller')

const mapRouter = (router) => {
    //恐怖袭击
    router.post('/api/map/terrorist', mapController.terrorist)
    //抗议风险
    router.post('/api/map/protest', mapController.protest)
    //政治风险
    router.post('/api/map/politics', mapController.politics)
    //罢工风险
    router.post('/api/map/strike', mapController.strike)
    //禁运风险
    router.post('/api/map/embargo', mapController.embargo)
    //制裁风险
    router.post('/api/map/sanction', mapController.sanction)

    //全部
    router.post('/api/map/region', mapController.region)
    //最新
    router.post('/api/map/latest', mapController.latest)
};

module.exports = mapRouter