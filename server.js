import express from 'express'
import { router as personRouter } from './person-router.js'

// create an express app and use JSON
let app = new express()
app.use(express.json())

// bring in some routers
app.use('/person', personRouter)


// setup the root level GET to return name and version from package.json
app.get('/', (req, res) => {
  res.send({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version
  })
})

app.listen(8080)
