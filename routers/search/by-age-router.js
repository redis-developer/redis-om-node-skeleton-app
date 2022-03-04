import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- FIND by age ------------------------------------------------------------
router.get('/by/age/:age', async (req, res) => {

  /* extract and coerce the parameters */
  const age = Number(req.params.age)

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('age').equals(age)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})

// ---- FIND adults ------------------------------------------------------------
router.get('/adults', async (req, res) => {

  /* extract and coerce the parameters */
  const age = Number(req.params.age)

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('age').greaterThanOrEqualTo(18)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})

