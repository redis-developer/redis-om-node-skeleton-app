import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- FIND with skills -------------------------------------------------------
router.get('/with/skills/:skills', async (req, res) => {

  /* extract and coerce the parameters */
  const skills = req.params.skills.split(',')

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('skills').containsOneOf(...skills)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})
