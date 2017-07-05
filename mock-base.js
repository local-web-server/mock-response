const EventEmitter = require('events')
const util = require('util')

class MockBase extends EventEmitter {
  [util.inspect.custom] (depth, options) {
    return options.stylize(this.constructor.name, 'special')
  }
}

module.exports = MockBase
