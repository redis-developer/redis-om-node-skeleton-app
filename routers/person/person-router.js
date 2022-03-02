import { Router } from 'express'

import { personRepository } from '../../om/person.js'

import { router as nameRouter } from './name-router.js'
import { router as ageRouter } from './age-router.js'
import { router as verifiedRouter } from './verified-router.js'
import { router as locationRouter } from './location-router.js'

export const router = Router()

router.use('/', nameRouter, ageRouter, verifiedRouter, locationRouter)

// ---- CREATE -----------------------------------------------------------------
router.put('/', async (req, res) => {

  /* create the Person from the request body which just
     happens to match our Schema */
  const person = await personRepository.createAndSave(req.body)

  /* return the newly created Person */
  res.send(person)
})

// ---- READ -------------------------------------------------------------------
router.get('/:id', async (req, res) => {

  /* fetch the Person */
  const person = await personRepository.fetch(req.params.id)
  
  /* return the fetched Person */
  res.send(person)
})

// ---- UPDATE -----------------------------------------------------------------
router.post('/:id', async (req, res) => {

  /* fetch the Person we are updating */
  const person = await personRepository.fetch(req.params.id)

  /* set all the properties, converting missing properties to null */
  person.firstName = req.body.firstName ?? null
  person.lastName = req.body.lastName ?? null
  person.age = req.body.age ?? null
  person.verified = req.body.verified ?? null
  person.location = req.body.location ?? null
  person.locationUpdated = req.body.locationUpdated ?? null
  person.skills = req.body.skills ?? null
  person.personalStatement = req.body.personalStatement ?? null

  /* save the updated Person */
  await personRepository.save(person)

  /* return the newly updated Person we just updated */
  res.send(person)
})

// ---- DELETE -----------------------------------------------------------------
router.delete('/:id', async (req, res) => {

  /* delete the Person with its id */
  await repository.remove(req.params.id)

  /* return the id of the deleted person */
  res.send({ id })
})
