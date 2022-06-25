module.exports = [
  {
    url: '/api/users',
    type: 'get',
    response(req, res) {
      return res.send([
        { username: 'admin', age: '18' },
        { username: 'user', age: '22' }
      ])
    }
  }
]
