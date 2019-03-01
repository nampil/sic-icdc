const pubsub = require('./pupsub')
const NEW_EVENT = 'new_event_created'
const USER_UPDATED = 'user_updated'

module.exports = {
    Subscription: {
        newEvent: {
            subscribe: () => pubsub.asyncIterator(NEW_EVENT)

        },
        userUpdated: {
            subscribe: () => pubsub.asyncIterator(USER_UPDATED)
        }
    }

}