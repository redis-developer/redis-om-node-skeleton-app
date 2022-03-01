import { Router } from 'express'
import { personRepository } from '../om/person.js'

export const router = Router()

// ---- FIND with skills -------------------------------------------------------
router.get('/skills/:skills', async (req, res) => {

  /* extract and coerce the parameters */
  const skills = req.params.skills.split(',')

  /* search for matching Persons */
  const search = personRepository.search()
  skills.forEach(skill => search.and('skills').contains(skill))
  const persons = await search.return.all()

  /* return the found Persons */
  res.send(persons)
})
