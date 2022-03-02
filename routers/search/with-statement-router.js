import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- FIND with statement matching text --------------------------------------
router.get('/with/statement/containing/:text', async (req, res) => {

  /* extract and coerce the parameters */
  const text = req.params.text

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('personalStatement').matches(text)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})
