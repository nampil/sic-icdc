const Sub = require('../model/sub')
const User = require('../model/user')
const {
    Subscription
} = require('../graphql/resolvers/merge')
const pubsub = require('../graphql/resolvers/pupsub')
const USER_UPDATED = 'user_updated'

exports.subSanitizer = async endpoint => {

    return (

        await Sub.findOneAndRemove({
            endpoint: endpoint
        }).then(async res => {
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

                        function transformSubIds(subs) {
                            return subs.map(sub => {
                                return {
                                    ...sub,
                                    _id: sub._id.toString()
                                }
                            })

                        }

                        pubsub.publish(USER_UPDATED, {
                            userUpdated: {
                                ...doc._doc,
                                _id: doc.id,
                                subs: transformSubIds(doc._doc.subs)
                            }
                        })
                    }
                }

            )
        }).catch(err => console.log(err))
    )


}