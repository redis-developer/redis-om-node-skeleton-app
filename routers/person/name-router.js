import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- READ first name --------------------------------------------------------
router.get('/:id/first-name', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure the first name */
  const { firstName } = await personRepository.fetch(id)

  /* return the first name */
  res.send({ id, firstName })
})

// ---- READ last name ---------------------------------------------------------
router.get('/:id/last-name', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure the last name */
  const { lastName } = await personRepository.fetch(id)

  /* return the last name */
  res.send({ id, lastName })
})

// ---- READ full name ---------------------------------------------------------
router.get('/:id/full-name', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure the last name */
  const { firstName, lastName } = await personRepository.fetch(id)

  /* return the last name */
  res.send({ id, firstName, lastName })
})

// ---- UPDATE first name ------------------------------------------------------
router.patch('/:id/first-name/:firstName', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const firstName = req.params.firstName

  /* update the first name */
  await updateFirstName(id, firstName)

  /* return the changed field */
  res.send({ id, firstName })
})

// ---- UPDATE last name -------------------------------------------------------
router.patch('/:id/last-name/:lastName', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const lastName = req.params.lastName

  /* update the last name */
  await updateLastName(id, lastName)

  /* return the changed field */
  res.send({ id, lastName })
})

// ---- UPDATE full name -------------------------------------------------------
router.patch('/:id/full-name/:firstName/:lastName', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const firstName = req.params.firstName
  const lastName = req.params.lastName

  /* update the last name */
  await updateFullName(id, firstName, lastName)

  /* return the changed fields */
  res.send({ id, firstName, lastName })
})

// ---- DELETE first name ------------------------------------------------------
router.delete('/:id/first-name', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update the first name to be null */
  await updateFirstName(id, null)

  /* return the id */
  res.send({ id })
})

// ---- DELETE last name -------------------------------------------------------
router.delete('/:id/last-name', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update the first name to be null */
  await updateLastName(id, null)

  /* return the id */
  res.send({ id })
})

// ---- DELETE full name -------------------------------------------------------
router.delete('/:id/full-name', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update the first name to be null */
  await updateFullName(id, null, null)

  /* return the id */
  res.send({ id })
})

async function updateFirstName(id, firstName) {

  /* fetch the Person we are updating and set the name */
  const person = await personRepository.fetch(id)
  person.firstName = firstName

  /* save the changes */
  await personRepository.save(person)
}

async function updateLastName(id, lastName) {

  /* fetch the Person we are updating and set the name */
  const person = await personRepository.fetch(id)
  person.lastName = lastName

  /* save the changes */
  await personRepository.save(person)
}

async function updateFullName(id, firstName, lastName) {

  /* fetch the Person we are updating and set the name */
  const person = await personRepository.fetch(id)
  person.firstName = firstName
  person.lastName = lastName

  /* save the changes */
  await personRepository.save(person)
}
