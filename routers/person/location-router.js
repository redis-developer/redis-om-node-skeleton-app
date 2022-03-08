import { Router } from 'express'
import { personRepository } from '../../om/person.js'
import { connection } from '../../om/client.js'

export const router = Router()

// ---- READ location ----------------------------------------------------------
router.get('/:id/location', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* fetch the Person and destructure the location */
  const { location, locationUpdated } = await personRepository.fetch(id)

  /* return the location */
  res.send({ id, location, locationUpdated })
})

// ---- UPDATE location --------------------------------------------------------
router.patch('/:id/location/:lng,:lat', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const longitude = Number(req.params.lng)
  const latitude = Number(req.params.lat)

  /* set the updated date time to right now */
  const locationUpdated = new Date()

  /* update the location */
  await updateLocation(id, locationUpdated, { longitude, latitude })

  /* log the location update to a stream */
  await connection.xAdd(`Person:${id}:locationHistory`, '*', {
    event: 'changed', longitude, latitude })

  /* return the changed field */
  res.send({ id, locationUpdated, location: { longitude, latitude } })
})

// ---- DELETE location --------------------------------------------------------
router.delete('/:id/location', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id

  /* set the updated date time to right now */
  const locationUpdated = new Date()

  /* update the location to be null */
  await updateLocation(id, locationUpdated, null)

  /* log the location update to a stream */
  await connection.xAdd(`Person:${id}:locationHistory`, '*', { event: 'removed' })

  /* return the id */
  res.send({ id , locationUpdated })
})

async function updateLocation(id, locationUpdated, location) {

  /* fetch the Person we are updating and set the location */
  const person = await personRepository.fetch(id)
  person.location = location
  person.locationUpdated = locationUpdated

  /* save the changes */
  await personRepository.save(person)
}
