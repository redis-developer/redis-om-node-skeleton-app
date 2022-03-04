import 'dotenv/config'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import { personRouter, searchRouter } from './routers/routers.js'

// create an express app and use JSON
const app = new express()
app.use(express.json())

// set up swagger
const swaggerDocument = YAML.load('api.yaml')
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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

app.listen(process.env.SKELETON_PORT)
