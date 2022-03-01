import { Router } from 'express'
import { personRepository } from '../repository.js'

export const router = Router()

// ---- FIND all ---------------------------------------------------------------
router.get('/all', async (req, res) => {

  /* search for all Persons */
  const persons = await personRepository.search().return.all()

  /* return all Persons */
  res.send(persons)
})
