const url = require('url')
const querystring = require('querystring')

class Express {
      constructor(req, res) {
            this.req = req
            this.res = res

            if (this.req.method != "GET") {
                  this.req.body = new Promise((done, rej) => {
                        let str = ''
                        this.req.on('data', (chunk) => (str += chunk))
                        this.req.on('end', () => {
                              try {
                                    done(JSON.parse(str))
                              } catch (error) {
                                    rej(console.log(error, "boldi"))
                              }
                              
                        })
                  })
            }

            this.res.json = (status, data) => {
                  this.res.writeHead(status, { 'Content-type': 'application/json' })
                  return this.res.end(JSON.stringify(data))
            }
      }
      get(route, callback) {
            let { query, pathname } = url.parse(this.req.url)
            this.req.query = querystring.parse(query)
            if (pathname == route && this.req.method == 'GET') {
                  callback(this.req, this.res)
            }
      }

      post(route, callback) {
            if (this.req.url == route && this.req.method == 'POST') {
                  callback(this.req, this.res)
            }
      }

      put(route, callback) {
            if (this.req.url == route && this.req.method == 'PUT') {
                  callback(this.req, this.res)
            }
      }
      delete(route, callback) {
            if (this.req.url == route && this.req.method == 'DELETE') {
                  callback(this.req, this.res)
            }
      }
}

module.exports = Express