'use strict'

const assert = require('chai').assert

const dynamodb = require('../lib/dynamodb')
const testtool = require('./dynamodb_testtool')

const contentId = 'contentId'
const contentUrl = 'contentUrl'

describe('DynamoDB', () => {
	context('contentId, contentUrl, tagsが引数渡された場合', () => {
		after(async () => {
			await testtool.deleteContent(contentId)
		})

		const tags = ['白峰あやか', '黒沢ゆりね'].join('/')

		it('引数に渡した内容が保存されること', async () => {
			await dynamodb.addContent(contentId, contentUrl, tags)

			const content = await testtool.getContent(contentId)

			assert.equal(content.Item.content_id, contentId)
			assert.equal(content.Item.content_url, contentUrl)
			assert.equal(content.Item.tags, tags)
		})
	})
})
