import { Client } from 'redis-om'

/* Redis OM uses the client to talk to Redis. It uses
   Node Redis behind the scenes. If you want to let
   Redis OM handle all that, just use the commented
   code below. */

// const client = await new Client().open(process.env.REDIS_URL)

/* If you want to use Node Redis and Redis OM together,
   keep the code below uncommented. */

import { createClient } from 'redis' 

export const connection = createClient({ url: process.env.REDIS_URL })
await connection.connect()

const client = await new Client().use(connection)

/* Regardless, keep this code. */

export default client
