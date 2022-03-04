import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- READ statement ---------------------------------------------------------
router.get('/:id/statement', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure their statement */
  const { personalStatement } = await personRepository.fetch(id)

  /* return their statement */
  res.send({ id, personalStatement })
})

// ---- UPDATE statement -------------------------------------------------------
router.patch('/:id/statement/:statement', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const personalStatement = req.params.statement

  /* update their statement */
  await updateStatement(id, personalStatement)

  /* return the changed field */
  res.send({ id, personalStatement: personalStatement })
})

// ---- DELETE statement -------------------------------------------------------
router.delete('/:id/statement', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update their statement to be null */
  await updateStatement(id, null)

  /* return the id */
  res.send({ id })
})

async function updateStatement(id, statement) {

  /* fetch the Person we are updating and set their statement */
  const person = await personRepository.fetch(id)
  person.personalStatement = statement

  /* save the changes */
  await personRepository.save(person)
}
