'use strict'

class MockResponse {
  middleware (options) {
    const arrayify = require('array-back')
    const path = require('path')
    const mockResponse = require('koa-mock-response')

    const mocks = arrayify(options.mocks)
    return mocks.map(mock => {
      if (mock.module) {
        const modulePath = path.resolve(path.join(options.directory || process.cwd(), mock.module))
        mock.responses = require(modulePath)
      }

      if (mock.responses) {
        return mockResponse(mock.route, mock.responses)
      } else if (mock.response) {
        mock.target = {
          request: mock.request,
          response: mock.response
        }
        return mockResponse(mock.route, mock.target)
      }
    })
  }
}

module.exports = MockResponse
