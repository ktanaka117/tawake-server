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

		const tags = ctx.request.body.tags.join('/')

		const fileName = [contentId, fileExtension].join('.')

		await s3.put(decodedFile, fileName, contentType)

		await dynamodb.addContent(contentId, `https://s3.amazonaws.com/tawake-dev/${fileName}`, `${tags}`)

		ctx.body = { 
			contentId: contentId,
			contentType: contentType,
			fileName:fileName,
			tags: tags
		}
	},

	get: async (ctx, next) => {
		const tag = ctx.params.tag

		const contents = await dynamodb.getContentsByTag(tag)
		ctx.body = {
			contents: contents
		}
	}
}

module.exports = controller