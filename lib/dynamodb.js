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
	addContent: async (contentId, contentUrl, name) => { await addContent(contentId, contentUrl, name) }
}

const addContent = async (contentId, contentUrl, name) => {
	const documentClient = new aws.DynamoDB.DocumentClient(option)

	const params = {
		TableName: config.tawake.contentsTable,
		Item: {
			content_id: contentId,
			name: name,
			content_url: contentUrl
		}
	}

	await documentClient.put(params).promise()
		.then(() => { console.log('DynamoDB Save Success!!!') })
		.catch((err) => { console.log(`DynamoDB Error!: ${err}`) })
}

