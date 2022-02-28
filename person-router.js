import { Router } from 'express'
import { addressRepository, personRepository } from './repository.js'

export const router = Router()

router.put('/', async (req, res) => {

  console.log(req.body)

  // create the address from the passed in data
  const address = await addressRepository.createAndSave(req.body.address)

  // create the person from the passed in data
  const person = await personRepository.createAndSave({ addressId: address.entityId, ...req.body })

  // return the id of the newly created Person
  res.send({ id: person.entityId })

})

router.get('/:id', async (req, res) => {

  // fetch the person
  let person = await personRepository.fetch(req.params.id)
  let address = await person.address()

  let json = person.toJSON()
  json.address = address.toJSON()

  // return the person we just fetched
  res.send(json)
})
