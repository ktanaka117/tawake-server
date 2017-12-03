'use strict'

// libraries
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

// controllers
const contentsController = require('./controllers/contents_controller.js')

// routing
router
	.get('/', (ctx) => { ctx.body = 'OK' })
	.put('/images', contentsController.put)

// export
module.exports = app
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(router.allowedMethods())