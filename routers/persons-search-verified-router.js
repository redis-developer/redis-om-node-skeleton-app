import { Router } from 'express'
import { personRepository } from '../repository.js'

export const router = Router()

// ---- FIND verified ----------------------------------------------------------
router.get('/verified', async (req, res) => {

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('verified').is.true()
      .return.all()

  /* return the found Persons */
  res.send(persons)
})

// ---- FIND not verified ------------------------------------------------------
router.get('/non-verified', async (req, res) => {

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('verified').is.not.true()
      .return.all()

  /* return the found Persons */
  res.send(persons)
})
