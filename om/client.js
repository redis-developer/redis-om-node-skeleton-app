import { Client } from 'redis-om'

const client = await new Client().open()

export default client
