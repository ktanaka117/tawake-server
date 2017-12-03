'use strict'

module.exports = {
	aws: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY
	},
	s3: {
		bucketName: process.env.S3_BUCKET_NAME
	}
}
