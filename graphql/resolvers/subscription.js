const pubsub = require('./pupsub')
const NEW_EVENT = 'new_event_created'

module.exports = {
    Subscription: {
        newEvent: {
            subscribe: () => pubsub.asyncIterator(NEW_EVENT)

        },
    }

}