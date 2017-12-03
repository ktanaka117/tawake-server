'use strict'

const aws = require('aws-sdk')
const config = require('../config/config')
const uuidv4 = require('uuid/v4')

aws.config.update({ accessKeyId: config.aws.accessKeyId, secretAccessKey: config.aws.secretAccessKey })

module.exports = {
	put: async (file, fileExtension, contentType) => { await put(file, fileExtension, contentType) }
}

const put = async (file, fileExtension, contentType) => {
	const s3 = new aws.S3()

	const params = {
		Body: file,
		Bucket: config.s3.bucketName,
		Key: [uuidv4(), fileExtension].join('.'),
		ContentType: contentType
	}

	await s3.putObject(params).promise()
		.then(() => { console.log('Success!!!') })
		.catch((err) => { console.log(`error...: ${err}`) })
}