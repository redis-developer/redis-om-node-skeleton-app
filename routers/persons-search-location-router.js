import { Router } from 'express'
import { personRepository } from '../repository.js'

export const router = Router()

// ---- FIND near location -----------------------------------------------------
router.get('/near/:lng,:lat/radius/:distance:units(mi|ft|km|m)', async (req, res) => {

  /* extract and coerce the parameters */
  const longitude = Number(req.params.lng)
  const latitude = Number(req.params.lat)
  const distance = Number(req.params.distance)
  const units = req.params.units

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('location')
      .inRadius(c => c.longitude(longitude).latitude(latitude).radius(distance)[units])
        .return.all()

  /* return the found Persons */
  res.send(persons)
})

// ---- FIND recently moved ----------------------------------------------------
router.get('/moved-after/:date', async (req, res) => {

  /* extract and coerce the parameters */
  const date = new Date(req.params.date)

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('locationLastUpdated').onOrAfter(date)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})
