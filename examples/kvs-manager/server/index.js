const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const esm = require('esm')(module)
const app = express()
const apiDispatcher = esm('./api_dispatcher').default

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const chokidar = require('chokidar')
    chokidar.watch('./server/api/').on('all', () => {
        Object.keys(esm.cache).forEach(id => {
            if (/[\/\\]server[\/\\]api[\/\\]/.test(id)) {
                delete esm.cache[id];
            }
        })
    })

    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Add API dispatcher
  app.use(apiDispatcher)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`)
  })
}
start()
