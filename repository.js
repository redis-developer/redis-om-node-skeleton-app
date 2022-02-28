import { Client, Entity, Schema } from 'redis-om'

export const client = await new Client().open()

class Person extends Entity {
  async address() {
    return await addressRepository.fetch(this.addressId)
  }
}

class Address extends Entity {
  async persons() {
    return await personRepository.search()
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

export const addressRepository = client.fetchRepository(addressSchema)
export const personRepository = client.fetchRepository(personSchema)

await personRepository.createIndex()
await addressRepository.createIndex()
