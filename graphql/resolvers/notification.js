const {
    subscription
} = require('./merge')
const pubsub = require('./pupsub')

const Sub = require('../../model/sub')
const User = require('../../model/user')


const webpush = require('web-push')

const USER_UPDATED = 'user_updated'

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




                const payload = JSON.stringify({
                    title: args.sendNotificationInput.title,
                    body: args.sendNotificationInput.msg,
                    tag: 'ICDC-Notification',
                    renotify: true,
                    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
                })

                console.log(payload)
                // Pass object into sendNotification
                webpush
                    .sendNotification(subcription, payload).then(res => console.log(res.statusCode))
                    .catch(async err => {
                        console.error(err.statusCode)
                        const endpointToDelete = err.endpoint

                        await Sub.findOneAndRemove({
                            endpoint: endpointToDelete
                        }).then(async res => {
                            console.log(res.userId)
                            console.log(res._id)

                            await User.findByIdAndUpdate({
                                    _id: res.userId
                                }, {
                                    "$pull": {
                                        "subs": res._id
                                    }
                                }, {
                                    safe: true,
                                    multi: true,
                                    new: true
                                },
                                function (err, doc) {
                                    if (err) {
                                        console.log(err);
                                    } else {

                                    }
                                }

                            )


                        }).catch(err => console.log(err))

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