'use strict'

const aws = require('aws-sdk')
const config = require('../config/config')

aws.config.update({ accessKeyId: config.aws.accessKeyId, secretAccessKey: config.aws.secretAccessKey })

module.exports = {
	put: async (file, fileExtension, contentType) => { await put(file, fileExtension, contentType) }
}

const put = async (file, fileName, contentType) => {
	const s3 = new aws.S3()

	const params = {
		Body: file,
		Bucket: config.s3.bucketName,
		Key: fileName,
		ContentType: contentType,
		ACL: 'public-read'
	}

	await s3.putObject(params).promise()
		.then(() => { console.log('S3 Save Success!!!') })
		.catch((err) => { console.log(`S3 Error...: ${err}`) })
}