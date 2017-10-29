'use strict'

const assert = require('assert')
const supertest = require('supertest')
const server = require('../../server.js')

const request = supertest(server.listen())

describe('PUT /images', () => {
	context('PUTで叩いたとき', () => {
		it('body.healthに文字列 "OK!" が返却されること', async () => {
			const res = await request
				.put('/images')

			assert.equal(res.status, 200)
			assert.equal(res.body.health, 'OK!')
		})
	})
})