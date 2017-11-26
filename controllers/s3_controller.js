'use strict'

const s3 = require('../lib/s3')

const controller = {
	put: async (ctx, next) => {
		await s3.put()

		ctx.body = { 'health': 'OK!' }
	}
}

module.exports = controller