const {
    subscription
} = require('./merge')


const webpush = require('web-push')

module.exports = {
    Query: {
        sendNotification: async (_, args, req) => {

            const subscriptionOnDB = await subscription(args.sendNotificationInput.subsIds)

            subscriptionOnDB.forEach((sub) => {

                const subcription = {
                    endpoint: sub.endpoint,
                    expirationTime: sub.expirationTime,
                    keys: {
                        p256dh: sub.p256dhKey,
                        auth: sub.authKey
                    }
                }

                console.log(subcription)


                const payload = JSON.stringify({
                    title: args.sendNotificationInput.title,
                    body: args.sendNotificationInput.msg
                })

                console.log(payload)
                // Pass object into sendNotification
                webpush
                    .sendNotification(subcription, payload).then(res => console.log(res))
                    .catch(err => console.error(err));
            })


            return {
                title: args.sendNotificationInput.title,
                msg: args.sendNotificationInput.msg,
                subsIds: args.sendNotificationInput.subsIds
            }
        }
    }

}