'use strict'

// libraries
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

// controllers

// routing
router
	.get('/', (ctx) => { ctx.body = 'OK' })

// export
module.exports = app
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())
	.use(router.allowedMethods())