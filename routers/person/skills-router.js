import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- READ skills ------------------------------------------------------------
router.get('/:id/skills', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure their skills */
  const { skills } = await personRepository.fetch(id)

  /* return the skills name */
  res.send({ id, skills })
})

// ---- UPDATE skills ----------------------------------------------------------
router.patch('/:id/skills/:skills', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const skills = req.params.skills.split(',')

  /* update the skills */
  await updateSkills(id, skills)

  /* return the changed field */
  res.send({ id, skills })
})

// ---- DELETE skills ----------------------------------------------------------
router.delete('/:id/skills', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update the skills to be null */
  await updateSkills(id, null)

  /* return the id */
  res.send({ id })
})

async function updateSkills(id, skills) {

  /* fetch the Person we are updating and set their skills */
  const person = await personRepository.fetch(id)
  person.skills = skills

  /* save the changes */
  await personRepository.save(person)
}
