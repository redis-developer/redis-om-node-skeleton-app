import { Client } from 'redis-om'

/* Redis OM uses the client to talk to Redis. It uses
   Node Redis behind the scences. */

// const client = await new Client().open(process.env.REDIS_URL)

/* If you want to use Node Redis and Redis OM together,
   comment the code above and use the code below. */

import { createClient } from 'redis' 

export const connection = createClient({ url: process.env.REDIS_URL })
await connection.connect()

const client = await new Client().use(connection)

export default client
