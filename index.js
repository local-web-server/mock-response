module.exports = MiddlewareBase => class MockResponse extends MiddlewareBase {
  description () {
    return 'Mock a Rest API or any backend service.'
  }

  optionDefinitions () {
    return [
      {
        name: 'mock.modules',
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

    if (options.mockModules && options.mockModules.length) {
      const flatten = require('reduce-flatten')
      const mocks = options.mockModules
        .map(mockPath => {
          return loadModule(mockPath)
        })
        .reduce(flatten)
      return arrayify(mocks).map(mock => {
        this.view.write('mock.added', {
          route: mock.route,
          responses: mock.responses
        })
        return mockResponse(mock.route, mock.responses)
      })
    }
  }
}
