import express from 'express'
import { router as personCrudRouter } from './routers/person-crud-router.js'
import { router as personPatchRouter } from './routers/person-patch-router.js'
import { router as personsAllRouter } from './routers/persons-all-router.js'
import { router as personsSearchAgeRouter } from './routers/persons-search-age-router.js'
import { router as personsSearchLocationRouter } from './routers/persons-search-location-router.js'
import { router as personsSearchNameRouter } from './routers/persons-search-name-router.js'
import { router as personsSearchSkillsRouter } from './routers/persons-search-skills-router.js'
import { router as personsSearchStatementRouter } from './routers/persons-search-statement-router.js'
import { router as personsSearchVerifiedRouter } from './routers/persons-search-verified-router.js'

// create an express app and use JSON
let app = new express()
app.use(express.json())

// bring in some routers
app.use('/person', personCrudRouter, personPatchRouter)

app.use('/persons',
  personsAllRouter, personsSearchNameRouter, personsSearchAgeRouter,
  personsSearchVerifiedRouter, personsSearchLocationRouter,
  personsSearchSkillsRouter, personsSearchStatementRouter)

// setup the root level GET to return name and version from package.json
app.get('/', (req, res) => {
  res.send({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version
  })
})

app.listen(8080)
