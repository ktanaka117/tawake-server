'use strict'

const s3 = require('../lib/s3')
const dynamodb = require('../lib/dynamodb')
const uuidv4 = require('uuid/v4')

const controller = {
	put: async (ctx, next) => {
		const encodedData = ctx.request.body.encoded_data

		const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, '')
		
		const decodedFile = new Buffer(fileData, 'base64')
		const contentId = uuidv4()
		const fileExtension = encodedData.toString().slice(encodedData.indexOf('/') + 1, encodedData.indexOf(';'))
		const contentType = encodedData.toString().slice(encodedData.indexOf(':') + 1, encodedData.indexOf(';'))

		const prefix = ctx.request.body.prefix

		const fileName = prefix + [contentId, fileExtension].join('.')

		await s3.put(decodedFile, fileName, contentType)

		await dynamodb.addContent(contentId, `https://s3.amazonaws.com/tawake-dev/${fileName}`, `${fileName}`)

		ctx.body = { 'health': 'OK!' }
	}
}

module.exports = controller