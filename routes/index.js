'use strict'

const Router = require('koa-router')
const router = new Router();

const userRouter = require('./user')
const policyRouter = require('./policy')
const mapRouter = require('./map')

userRouter(router)
policyRouter(router)
mapRouter(router)

module.exports = router