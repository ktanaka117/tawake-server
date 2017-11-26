'use strict'

const aws = require('aws-sdk')
const config = require('../config/config')
const uuidv4 = require('uuid/v4')
const fs = require('fs')
const filetype = require('file-type')

aws.config.update({ accessKeyId: config.aws.accessKeyId, secretAccessKey: config.aws.secretAccessKey })

module.exports = {
	put: async () => { await put() }
}

const put = async () => {
	const s3 = new aws.S3()
	const file = fs.readFileSync(__dirname + '/nyorin.png')
	const fileType = filetype(file)
	const extension = fileType.ext
	const mimeType = fileType.mime

	const params = {
		Body: file,
		Bucket: config.s3.bucketName,
		Key: [uuidv4(), extension].join('.'),
		ContentType: mimeType
	}

	await s3.putObject(params).promise()
		.then(() => { console.log('Success!!!') })
		.catch((err) => { console.log(`error...: ${err}`) })
}