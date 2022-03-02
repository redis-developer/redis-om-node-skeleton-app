import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- FIND by first name -----------------------------------------------------
router.get('/by/first-name/:firstName', async (req, res) => {

  /* extract and coerce the parameters */
  const firstName = req.params.firstName

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('firstName').equals(firstName)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})

// ---- FIND by last name ------------------------------------------------------
router.get('/by/last-name/:lastName', async (req, res) => {

  /* extract and coerce the parameters */
  const lastName = req.params.lastName

  /* fetch the Person */
  const persons = await personRepository.search()
    .where('lastName').equals(lastName)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})  

// ---- FIND by full name ------------------------------------------------------
router.get('/by/full-name/:firstName/:lastName', async (req, res) => {

  /* extract and coerce the parameters */
  const firstName = req.params.firstName
  const lastName = req.params.lastName

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('firstName').equals(firstName)
      .and('lastName').equals(lastName)
        .return.all()

  /* return the found Persons */
  res.send(persons)
})
