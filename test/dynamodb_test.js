'use strict'

const assert = require('chai').assert

const dynamodb = require('../lib/dynamodb')
const testtool = require('./dynamodb_testtool')

const contentId = 'contentId'
const contentUrl = 'contentUrl'
const tags = ['白峰あやか', '黒沢ゆりね'].join('/')

describe('DynamoDB', () => {
	context('addContent', () => {
		context('contentId, contentUrl, tagsが引数渡された場合', () => {
			after(async () => {
				await testtool.deleteContent(contentId)
			})
	
			it('引数に渡した内容が保存されること', async () => {
				await dynamodb.addContent(contentId, contentUrl, tags)
	
				const content = await testtool.getContent(contentId)
	
				assert.equal(content.Item.content_id, contentId)
				assert.equal(content.Item.content_url, contentUrl)
				assert.equal(content.Item.tags, tags)
			})
		})
	})

	context('getContentByTag', () => {
		context('tagを引数に渡した場合', () => {
			before(async () => {
				await dynamodb.addContent(contentId, contentUrl, tags)
			})

			after(async () => {
				await testtool.deleteContent(contentId)
			})

			it('tagを含む関連するコンテンツが取得できること', async () => {
				const contents = await dynamodb.getContentByTag('白峰あやか')

				assert.equal(contents[0].content_id, contentId)
				assert.equal(contents[0].content_url, contentUrl)
				assert.equal(contents[0].tags, tags)
			})
		})
	})
})
