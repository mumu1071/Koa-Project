'use strict'

const Router = require('koa-router')
const router = new Router();

const userRouter = require('./user')
const policyRouter = require('./policy')
const mapRouter = require('./map')
const fileRouter = require('./file')

userRouter(router)
policyRouter(router)
mapRouter(router)
fileRouter(router)

module.exports = router