const authResolver = require('./auth')
const membersResolver = require('./members')
const eventResolver = require('./event')
const guestResolver = require('./guest')
const subscriptionResolver = require('./subscription')
const notifications = require('./notification')

const rootResolver = {
    RootQuery: {
        ...authResolver.Query,
        ...membersResolver.Query,
        ...eventResolver.Query,
        ...guestResolver.Query,
        ...notifications.Query
    },

    RootMutation: {
        ...authResolver.Mutation,
        ...membersResolver.Mutation,
        ...eventResolver.Mutation,
        ...guestResolver.Mutation
    },

    Subscription: {
        ...subscriptionResolver.Subscription
    }

    //,
    // ...eventResolver,
    // ...guestResolver,
    // ...subscriptionResolver
}

module.exports = rootResolver;