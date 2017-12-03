'use strict'

const s3 = require('../lib/s3')

const controller = {
	put: async (ctx, next) => {
		const encodedData = ctx.request.body.encoded_data

		const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, '')
		
		const decodedFile = new Buffer(fileData, 'base64')
		const fileExtension = encodedData.toString().slice(encodedData.indexOf('/') + 1, encodedData.indexOf(';'))
		const contentType = encodedData.toString().slice(encodedData.indexOf(':') + 1, encodedData.indexOf(';'))

		await s3.put(decodedFile, fileExtension, contentType)

		ctx.body = { 'health': 'OK!' }
	}
}

module.exports = controller