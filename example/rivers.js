module.exports = MockBase => class MockRivers extends MockBase {
  mocks () {
    this.emit('verbose', 'HELLO', 'MUM')
    return {
      route: '/rivers',
      responses: [
        {
          response: { type: 'json', body: [
            { name: 'Volga', drainsInto: 'Caspian Sea' },
            { name: 'Danube', drainsInto: 'Black Sea' },
            { name: 'Ural', drainsInto: 'Caspian Sea' },
            { name: 'Dnieper', drainsInto: 'Black Sea' }
          ]}
        }
      ]
    }
  }
}
