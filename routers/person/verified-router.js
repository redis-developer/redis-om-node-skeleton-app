import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- READ verified ----------------------------------------------------------
router.get('/:id/verified', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure the verification status */
  const { verified } = await personRepository.fetch(id)

  /* return the verification status */
  res.send({ id, verified })
})

// ---- UPDATE verified --------------------------------------------------------
router.patch('/:id/verified/:verified', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const verified = req.params.verified === 'true'

  /* update the verification status */
  await updateVerification(id, verified)

  /* return the changed field */
  res.send({ id, verified })
})

// ---- DELETE verified --------------------------------------------------------
router.delete('/:id/verified', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update the verification status to be null */
  await updateVerification(id, null)

  /* return the id */
  res.send({ id })
})

async function updateVerification(id, verified) {

  /* fetch the Person we are updating and set the verification status */
  const person = await personRepository.fetch(id)
  person.verified = verified

  /* save the changes */
  await personRepository.save(person)

  /* return the id of the changed Person */
  return id
}

