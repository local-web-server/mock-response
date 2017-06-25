module.exports = MiddlewareBase => class MockResponse extends MiddlewareBase {
  description () {
    return 'Mock a Rest API or any backend service.'
  }

  optionDefinitions () {
    return [
      {
        name: 'mocks',
        multiple: true,
        typeLabel: '[underline]{file}',
        description: 'Mock response module'
      }
    ]
  }

  middleware (options) {
    const arrayify = require('array-back')
    const path = require('path')
    const mockResponse = require('koa-mock-response')
    const loadModule = require('load-module')

    if (options.mocks && options.mocks.length) {
      const flatten = require('reduce-flatten')
      const mocks = options.mocks
        .map(mockPath => {
          return typeof mockPath === 'string' ? loadModule(mockPath) : mockPath
        })
        .reduce(flatten)
      this.emit('verbose', 'middleware.mock-response.config', { mocks })
      return arrayify(mocks).map(mock => {
        return mockResponse(mock.route, mock.responses)
      })
    }
  }
}
