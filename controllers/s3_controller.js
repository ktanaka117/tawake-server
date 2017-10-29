'use strict'

const controller = {
	put: async (ctx, next) => {
		ctx.body = { 'health': 'OK!' }
	}
}

module.exports = controller