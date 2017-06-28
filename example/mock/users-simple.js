const users = [
  { "id": 1, "name": "Lloyd", "age": 40 },
  { "id": 2, "name": "Mona", "age": 34 },
  { "id": 3, "name": "Francesco", "age": 24 }
]

/* response mocks for /users */
module.exports = [
  {
    route: '/users',
    responses: [
      /* Respond with 400 Bad Request for PUT and DELETE requests (inappropriate on a collection) */
      { request: { method: 'PUT' }, response: { status: 400 } },
      { request: { method: 'DELETE' }, response: { status: 400 } },
      {
        /* for GET requests return the collection */
        request: { method: 'GET' },
        response: { type: 'application/json', body: users }
      },
      {
        /* for POST requests, create a new user and return its location */
        request: { method: 'POST' },
        response: function (ctx) {
          const newUser = ctx.request.body
          users.push(newUser)
          newUser.id = users.length
          ctx.status = 201
          ctx.response.set('Location', `/users/${newUser.id}`)
        }
      }
    ]
  }
]
