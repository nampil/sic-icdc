const http = require('http')
const {
    ApolloServer
} = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const {
    typeDefs
} = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const isAuth = require('./middleware/is-auth')
const history = require('connect-history-api-fallback')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@ndev01-quhgy.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`, {
            useNewUrlParser: true
        }
    )
    .then(() => {
        console.log('Connected to DB...')
    })
    .catch(err => {
        console.log(err)
    })

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(isAuth)
const PORT = process.env.PORT || 4000
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({
        req,
        connection
    }) => {
        if (connection) {
            return {
                req,

                connection
            }
        } else {
            return {
                req,

            }
        }
    },
    subscriptions: {
        onConnect: () => console.log('Connected to websocket')
    },
    tracing: true
})

server.applyMiddleware({
    app
})


const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)
app.use(history())

httpServer.listen(PORT, () => {
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
    )
})