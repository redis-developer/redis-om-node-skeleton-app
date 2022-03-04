import { Client } from 'redis-om'

const client = await new Client().open(process.env.REDIS_URL)

export default client
