import { Router } from 'express'
import { personRepository } from '../om/person.js'

export const router = Router()

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
