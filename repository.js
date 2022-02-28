import { Client, Entity, Schema } from 'redis-om'

export const client = await new Client().open()
export const addressRepository
export const personRepository

class Person extends Entity {
  get address() {
    return addressRepository.fetch(this.addressId)
  }
}

class Address extends Entity {
  get persons() {
    return personRepository.search()
      .where('addressId').eq(this.addressId)
      .return.all()
  }
}

const personSchema = new Schema(Person, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  addressId: { type: 'string' },
  location: { type: 'point' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' }
})  

const addressSchema = new Schema(Address, {
  streetNumber: { type: 'number' },
  unit: { type: 'string' },
  streetName: { type: 'string' },
  city: { type: 'string' },
  state: { type: 'string' },
  postalCode: { type: 'string' },
  country: { type: 'string' }
})

personRepository = client.fetchRepository(personSchema)
addressRepository = client.fetchRepository(addressSchema)

await personRepository.createIndex()
await addressRepository.createIndex()
