import "reflect-metadata"
require('dotenv').config()
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { buildSchema } from 'type-graphql'
import { TestResolver } from "./resolvers/test"
import Redis, { RedisOptions } from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from "cors"
import { COOKIE, __prod__ } from "./constants/constants"
import { connection } from "./database/dataSource"
import { UserResolver } from "./resolvers/user"
import { StripeResolver } from "./resolvers/stripe"

const PORT = process.env.PORT || 4000

const main = async () => {

    await connection.initialize()

    const app = express()

    const RedisStore = connectRedis(session)
    const redis = new Redis(process.env.REDIS_URL as RedisOptions)

    app.set("trust proxy", 1)

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }))

    app.use(session({
        name: COOKIE,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax', // * csrf
            secure: __prod__ // * cookie only works in https
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET as string | string[],
        resave: false,
    }))

    app.get('/', (_, res) => {
        res.send("Server is working fine!")
    })
    console.log('My connection', connection)

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TestResolver, UserResolver, StripeResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res, redis }),
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ]
    })

    apolloServer.start().then((_) => {
        apolloServer.applyMiddleware({ app, cors: { origin: false } })
        const server = app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
        process.on('unhandledRejection', (err, _) => {
            console.log(`Logged Error: ${err}`)
            server.close(() => process.exit(1))
        })
    })
}
main().catch((error) => {
    console.error(error)
})