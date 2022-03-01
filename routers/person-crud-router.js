import { Router } from 'express'
import { personRepository } from '../om/person.js'

export const router = Router()

// ---- CREATE -----------------------------------------------------------------
router.put('/', async (req, res) => {

  /* create the Person from the request body which just
     happens to match our Schema */
  const person = await personRepository.createAndSave(req.body)

  /* return the id of the newly created Person */
  res.send({ id: person.entityId })
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

  // fetch the Person we are updating
  let person = await personRepository.fetch(req.params.id)

  // set all the properties, converting missing properties null
  person.firstName = req.body.firstName ?? null
  person.lastName = req.body.lastName ?? null
  person.age = req.body.age ?? null
  person.addressId = req.body.addressId ?? null
  person.location = req.body.location ?? null
  person.skills = req.body.skills ?? null
  person.personalStatement = req.body.personalStatement ?? null

  // save the updated Person to Redis
  id = await personRepository.save(person)

  // return the id of the Person we just updated
  res.send({ id })
})

// ---- DELETE -----------------------------------------------------------------
router.delete('/:id', async (req, res) => {

  /* delete the Person with its id */
  await repository.remove(req.params.id)

  /* respond with OK */
  res.type('application/json')
  res.send('OK')
})

// ---- UPDATE a string --------------------------------------------------------
router.patch('/:id/firstName/:firstName', async (req, res) => {

  // fetch the Person we are updating
  let person = await personRepository.fetch(req.params.id)

  // set the property we are updating
  person.firstName = req.params.firstName

  // save the updated Person to Redis
  let id = await personRepository.save(person)

  // return the id of the Person we just updated
  res.send({ id })
})

// ---- UPDATE a number --------------------------------------------------------
router.patch('/:id/age/:age', async (req, res) => {

  // fetch the Person we are updating
  let person = await personRepository.fetch(req.params.id)

  // set the property we are updating
  person.age = Number(req.params.age)

  // save the updated Person to Redis
  let id = await personRepository.save(person)

  // return the id of the Person we just updated
  res.send({ id })
})

// ---- UPDATE a point ---------------------------------------------------------
router.patch('/:id/location/:longitude,:latitude', async (req, res) => {

  // fetch the Person we are updating
  let person = await personRepository.fetch(req.params.id)

  // set the property we are updating
  person.location.longitude = Number(req.params.longitude)
  person.location.latitude = Number(req.params.latitude)

  // save the updated Person to Redis
  let id = await personRepository.save(person)

  // return the id of the Person we just updated
  res.send({ id })
})

// ---- UPDATE a string[] ------------------------------------------------------
router.patch('/:id/skills/:skills', async (req, res) => {

  // fetch the Person we are updating
  let person = await personRepository.fetch(req.params.id)

  // set the property we are updating
  person.skills = req.params.skills.split(',')

  // save the updated Person to Redis
  let id = await personRepository.save(person)

  // return the id of the Person we just updated
  res.send({ id })
})
