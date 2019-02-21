const http = require('http')
const {
    ApolloServer
} = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
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

const app = express()
app.use(history({
    index: '/'
}));
app.use(express.static(__dirname + '/public'))
app.use(isAuth)
app.use(cors())
app.use(bodyParser.json())

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


const PORT = process.env.PORT || 4000

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

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)


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