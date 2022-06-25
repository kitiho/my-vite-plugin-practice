import path from 'path'
let mockRouteMap = {}
function createRoute(mockConfList) {
  mockConfList.forEach(mockConf => {
    const method = mockConf.type || 'get';
    const path = mockConf.url;
    const handler = mockConf.response;
    const route = { path, method: method.toLowerCase(), handler };
    if (!mockRouteMap[method]) {
      mockRouteMap[method] = []
    }
    console.log('create mock api:', route.method, route.path)
    mockRouteMap[method].push(route)
  })
  console.log('mockRouteMap', mockRouteMap)
}
function matchRoute(req) {
  const url = req.url
  const method = req.method.toLowerCase()
  const routelList = mockRouteMap[method]
  return routelList && routelList.find(item => item.path === url)
}
function send(body) {
  let chunk = JSON.stringify(body)
  if (chunk) {
    chunk = Buffer.from(chunk, 'utf-8')
    this.setHeader('Content-Length', chunk.length)
  }
  this.setHeader('Content-Type', 'application/json')
  this.statusCode = 200
  this.end(chunk, 'utf-8')
}
export default function (options = {}) {
  options.entry = options.entry || './mock/index.js'
  return {
    name: 'mock-plugin',
    configureServer({ app }) {
      const mockObj = require(options.entry)
      createRoute(mockObj)
      const middleware = (req, res, next) => {
        console.log(req.url, req.method)
        let route = matchRoute(req)
        if (route) {
          res.send = send
          route.handler(req, res)
        } else {
          next()
        }
      }
      app.use(middleware)
    }
  }
}
