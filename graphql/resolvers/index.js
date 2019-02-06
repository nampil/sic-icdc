const authResolver = require('./auth')
const membersResolver = require('./members')
const eventResolver = require('./event')
const guestResolver = require('./guest')

const rootResolver = {
    ...authResolver,
    ...membersResolver,
    ...eventResolver,
    ...guestResolver
}

module.exports = rootResolver;