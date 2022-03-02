import { Router } from 'express'

import { personRepository } from '../../om/person.js'

import { router as byNameRouter } from './by-name-router.js'
import { router as byAgeRouter } from './by-age-router.js'
import { router as byVerifiedRouter } from './by-verified-router.js'
import { router as nearLocationRouter } from './near-location-router.js'
import { router as withSkillsRouter } from './with-skills-router.js'
import { router as withStatementRouter } from './with-statement-router.js'

export const router = Router()

router.use('/', byNameRouter, byAgeRouter, byVerifiedRouter, nearLocationRouter,
  withSkillsRouter, withStatementRouter)

// ---- FIND all ---------------------------------------------------------------
router.get('/all', async (req, res) => {

  /* search for all Persons */
  const persons = await personRepository.search().return.all()

  /* return all Persons */
  res.send(persons)
})

// ---- FIND recently moved ----------------------------------------------------
router.get('/moved-after/:date', async (req, res) => {

  /* extract and coerce the parameters */
  const date = new Date(req.params.date)

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('locationLastUpdated').onOrAfter(date)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})

