import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- READ age -------------------------------------------------------------
router.get('/:id/age', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure the age */
  const { age } = await personRepository.fetch(id)

  /* return the age */
  res.send({ id, age })
})

// ---- UPDATE age -------------------------------------------------------------
router.patch('/:id/age/:age', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const age = Number(req.params.age)

  /* update the age */
  await updateAge(id, age)

  /* return the changed field */
  res.send({ id, age })
})

// ---- DELETE age -------------------------------------------------------------
router.delete('/:id/age', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update the age to be null */
  await updateAge(id, null)

  /* return the id */
  res.send({ id })
})

async function updateAge(id, age) {

  /* fetch the Person we are updating and set the age */
  const person = await personRepository.fetch(id)
  person.age = age

  /* save the changes */
  await personRepository.save(person)

  /* return the id of the changed Person */
  return id
}
