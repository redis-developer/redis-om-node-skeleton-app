import express from 'express'

import { personRouter, searchRouter } from './routers/routers.js'

// create an express app and use JSON
const app = new express()
app.use(express.json())

// bring in some routers
app.use('/person', personRouter)
app.use('/persons',searchRouter)

// setup the root level GET to return name and version from package.json
app.get('/', (req, res) => {
  res.send({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version
  })
})

app.listen(8080)
