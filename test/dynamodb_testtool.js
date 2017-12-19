'use strict'

const aws = require('aws-sdk')
const config = require('../config/config')

const option = {}

// Dynamodb localの設定
if (config.ddb.endpoint) {
  option.endpoint = config.ddb.endpoint
}

aws.config.update({ region: process.env.AWS_DEFAULT_REGION })

module.exports = {
	deleteContent: async (contentId) => { await deleteContent(contentId) },
	getContent: async (contentId) => { return await getContent(contentId) }
}

const deleteContent = async (contentId) => {
	const documentClient = new aws.DynamoDB.DocumentClient(option)

	const params = {
		TableName: config.tawake.contentsTable,
		Key: {
			content_id: contentId
		}
	}

	await documentClient.delete(params).promise()
}

const getContent = async (contentId) => {
	const documentClient = new aws.DynamoDB.DocumentClient(option)
	
		const params = {
			TableName: config.tawake.contentsTable,
			Key: {
				content_id: contentId
			}
		}
	
		return await documentClient.get(params).promise()
}