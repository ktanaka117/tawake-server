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
	addContent: async (contentId, contentUrl, tags) => { await addContent(contentId, contentUrl, tags) },
	getContentByTag: async (tag) => { return await getContentByTag(tag) }
}

const addContent = async (contentId, contentUrl, tags) => {
	const documentClient = new aws.DynamoDB.DocumentClient(option)

	const params = {
		TableName: config.tawake.contentsTable,
		Item: {
			content_id: contentId,
			content_url: contentUrl,
			tags: tags
		}
	}

	await documentClient.put(params).promise()
		.then(() => { console.log('DynamoDB Save Success!!!') })
		.catch((err) => { console.log(`DynamoDB Error!: ${err}`) })
}

const getContentByTag = async (tag) => {
	const documentClient = new aws.DynamoDB.DocumentClient(option)
	
	const params = {
		TableName: config.tawake.contentsTable,
		ExpressionAttributeValues : { ':tag': tag },
		FilterExpression : 'contains(tags,:tag)'
  }

	const contents = await documentClient.scan(params).promise()
		.catch((err) => { console.log(`DynamoDB Error!: ${err}`) })

	return contents.Items
}
