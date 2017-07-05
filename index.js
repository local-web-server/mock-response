module.exports = MiddlewareBase => class MockResponse extends MiddlewareBase {
  description () {
    return 'Mock a response for any given request.'
  }

  optionDefinitions () {
    return [
      {
        name: 'mocks',
        multiple: true,
        typeLabel: '[underline]{file} [underline]{...}',
        description: 'One or more modules exporting Mock Responses.'
      }
    ]
  }

  middleware (options) {
    const arrayify = require('array-back')
    const path = require('path')
    const mockResponse = require('koa-mock-response')
    const loadModule = require('load-module')

    let mocks = arrayify(options.mocks)
    if (mocks && mocks.length) {
      const flatten = require('reduce-flatten')
      mocks = mocks
        .map(mockPath => {
          return typeof mockPath === 'string' ? loadModule(mockPath) : mockPath
        })
        .reduce(flatten, [])
      this.emit('verbose', 'middleware.mock-response.config', { mocks })

      return mocks.map(m => {
        const MockBase = require('./mock-base')
        const Mock = m(MockBase)
        let mock = new Mock()
        mock = mock.mock()
        // const request = mock.request()
        // const response = {
        //   request,
        //   response: mock.response()
        // }
        return mockResponse(mock.route, mock.responses)
      })
    }
  }
}
