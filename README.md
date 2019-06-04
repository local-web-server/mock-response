[![view on npm](https://img.shields.io/npm/v/lws-mock-response.svg)](https://www.npmjs.org/package/lws-mock-response)
[![npm module downloads](https://img.shields.io/npm/dt/lws-mock-response.svg)](https://www.npmjs.org/package/lws-mock-response)
[![Build Status](https://travis-ci.org/lwsjs/mock-response.svg?branch=master)](https://travis-ci.org/lwsjs/mock-response)
[![Dependency Status](https://badgen.net/david/dep/lwsjs/mock-response)](https://david-dm.org/lwsjs/mock-response)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# lws-mock-response

Middleware adding mock responses to lws.

Imagine the network is down or you're working offline, proxied requests to `https://internal-service.local/api/users/1` would fail. In this case, Mock Responses can fill the gap. Mocks are defined in a module which can be reused between projects.

Trivial example - respond to a request for `/rivers` with some JSON. Save the following Javascript in a file named `example-mocks.js`.

```js
module.exports = MockBase => class MockRivers extends MockBase {
  mocks () {
    return {
      route: '/rivers',
      responses: [
        {
          response: {
            type: 'json',
            body: [
              { name: 'Volga', drainsInto: 'Caspian Sea' },
              { name: 'Danube', drainsInto: 'Black Sea' },
              { name: 'Ural', drainsInto: 'Caspian Sea' },
              { name: 'Dnieper', drainsInto: 'Black Sea' }
            ]
          }
        }
      ]
    }
  }
}
```

Launch `ws` passing in your mocks module.

```sh
$ ws --mocks example-mocks.js
Serving at http://mbp.local:8000, http://127.0.0.1:8000, http://192.168.0.100:8000
```

GET your rivers.

```sh
$ curl http://127.0.0.1:8000/rivers
[
  {
    "name": "Volga",
    "drainsInto": "Caspian Sea"
  },
  {
    "name": "Danube",
    "drainsInto": "Black Sea"
  },
  {
    "name": "Ural",
    "drainsInto": "Caspian Sea"
  },
  {
    "name": "Dnieper",
    "drainsInto": "Black Sea"
  }
]
```

See [the tutorials](https://github.com/lwsjs/local-web-server/wiki/How-to-create-a-mock-response) for more information and examples about mock responses.

* * *

&copy; 2016-19 Lloyd Brookes \<75pound@gmail.com\>.
