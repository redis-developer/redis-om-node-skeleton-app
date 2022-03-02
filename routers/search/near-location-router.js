import { Router } from 'express'
import { personRepository } from '../../om/person.js'

export const router = Router()

// ---- FIND near location -----------------------------------------------------
router.get('/near/:lng,:lat/radius/:radius', async (req, res) => {

  /* extract and coerce the parameters */
  const longitude = Number(req.params.lng)
  const latitude = Number(req.params.lat)
  const radius = Number(req.params.radius)

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('location')
      .inRadius(circle => circle
          .longitude(longitude)
          .latitude(latitude)
          .radius(radius)
          .meters)
        .return.all()

  /* return the found Persons */
  res.send(persons)
})
