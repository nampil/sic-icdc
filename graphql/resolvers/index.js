const authResolver = require('./auth')
const membersResolver = require('./members')

const rootResolver = {
    ...authResolver,
    ...membersResolver
}

module.exports = rootResolver;