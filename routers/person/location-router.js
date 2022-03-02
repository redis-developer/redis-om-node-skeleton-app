import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- READ location ----------------------------------------------------------
router.get('/:id/location', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure the age */
  const { location } = await personRepository.fetch(id)

  /* return the age */
  res.send({ id, location })
})

// ---- UPDATE location --------------------------------------------------------
router.patch('/:id/location/:lng,:lat', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const longitude = Number(req.params.lng)
  const latitude = Number(req.params.lat)

  /* update the location */
  await updateLocation(id, { longitude, latitude })

  /* return the changed field */
  res.send({ id, location: { longitude, latitude } })
})

// ---- DELETE location --------------------------------------------------------
router.delete('/:id/location', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* update the age to be null */
  await updateLocation(id, null)

  /* return the id */
  res.send({ id })
})

async function updateLocation(id, location) {

  /* fetch the Person we are updating and set the location */
  const person = await personRepository.fetch(id)
  person.location = location

  /* save the changes */
  await personRepository.save(person)

  /* return the id of the changed Person */
  return id
}
