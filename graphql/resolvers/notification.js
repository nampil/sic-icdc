const {
    Subscription
} = require('./merge')
const pubsub = require('./pupsub')

const webpush = require('web-push')
const {
    subSanitizer
} = require('../../helpers/subSanitizer')

const USER_UPDATED = 'user_updated'

module.exports = {
    Query: {
        sendNotification: async (_, args, req) => {

            const subscriptionOnDB = await Subscription(args.sendNotificationInput.subsIds)

            subscriptionOnDB.forEach((sub) => {

                const subcription = {
                    endpoint: sub.endpoint,
                    expirationTime: sub.expirationTime,
                    keys: {
                        p256dh: sub.p256dhKey,
                        auth: sub.authKey
                    }
                }

                const payload = JSON.stringify({
                    title: args.sendNotificationInput.title,
                    body: args.sendNotificationInput.msg
                })

                console.log(payload)
                // Pass object into sendNotification
                webpush
                    .sendNotification(subcription, payload).then(res => console.log(res.statusCode))
                    .catch(async (err) => {
                        console.error(err.statusCode)

                        subSanitizer(err.endpoint)

                    });
            })


            return {
                title: args.sendNotificationInput.title,
                msg: args.sendNotificationInput.msg,
                subsIds: args.sendNotificationInput.subsIds
            }
        }
    }

}