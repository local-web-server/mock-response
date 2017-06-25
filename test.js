const TestRunner = require('test-runner')
const MockResponse = require('./')
const Lws = require('lws')
const request = require('req-then')
const runner = new TestRunner()
const a = require('assert')

runner.test('simple', async function () {
  const port = 8000 + this.index
  const lws = new Lws()
  const server = lws.create({
    port,
    stack: MockResponse,
    mocks: [
      {
        route: '/one',
        responses: [
          { response: { body: 'one' } }
        ]
      }
    ]
  })
  const response = await request(`http://localhost:${port}/one`)
  server.close()
  a.strictEqual(response.res.statusCode, 200)
  a.strictEqual(response.data.toString(), 'one')
})
