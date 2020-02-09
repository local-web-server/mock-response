const Tom = require('test-runner').Tom
const MockResponse = require('./')
const Lws = require('lws')
const fetch = require('node-fetch')
const a = require('assert').strict

const tom = module.exports = new Tom('mock')

tom.test('simple', async function () {
  const port = 8000 + this.index
  class Mock {
    mocks () {
      return [
        {
          route: '/one',
          responses: [
            { response: { body: 'one' } }
          ]
        }
      ]
    }
  }
  const lws = Lws.create({
    port,
    stack: MockResponse,
    mocks: Mock
  })
  const response = await fetch(`http://localhost:${port}/one`)
  lws.server.close()
  a.equal(response.status, 200)
  const body = await response.text()
  a.equal(body, 'one')
})
