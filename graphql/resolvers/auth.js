const bcrypt = require('bcryptjs')
const User = require('../../model/user')
const Sub = require('../../model/sub')
const {
    events,
    members,
    transformUser,
    Subscription,
    transformSub
} = require('../resolvers/merge')
const pubsub = require('../resolvers/pupsub')
const jwt = require('jsonwebtoken')
const webpush = require('web-push')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

const USER_UPDATED = 'user_updated'

const secret = process.env.SECRET

module.exports = {
    Query: {
        login: async (_, args, req) => {
            const user = await User.findOne({
                email: args.email
            })
            if (!user) {
                throw new Error('Invalid credencials')
            }
            const isEqual = await bcrypt.compare(args.password, user.password)
            if (!isEqual) {
                throw new Error('Invalid credencials')
            }
            const token = await jwt.sign({
                    userId: user.id,
                    email: user.email
                },
                secret, {
                    expiresIn: '1h'
                }
            )

            return {
                userId: user.id,
                token: token,
                tokenExpiration: 1,
                name: user.name,
                role: user.role
            }
        },
        relogin: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                throw new Error('No Autorizado')
            }

            const authHeader = req.get('Authorization')

            const oldToken = authHeader.split(' ')[1]

            let decodedOldToken
            try {
                decodedOldToken = jwt.verify(oldToken, secret)
            } catch (err) {}

            if (decodedOldToken) {
                const newtoken = await jwt.sign({
                        userId: decodedOldToken.userId,
                        email: decodedOldToken.email
                    },
                    secret, {
                        expiresIn: '1h'
                    }
                )

                const user = await User.findOne({
                    email: decodedOldToken.email
                })

                console.log('relogin')

                return {
                    userId: decodedOldToken.userId,
                    token: newtoken,
                    tokenExpiration: 1,
                    role: user.role,
                    name: user.name
                }
            }
        },

        user: async (_, args, {
            req
        }) => {
            try {
                const user = await User.findOne(args)

                if (!user) {
                    throw new Error('No se encontró este usuario')
                }

                return {
                    ...user._doc,
                    _id: user.id,
                    createdMembers: members.bind(this, user._doc.createdMembers),
                    createdEvents: events.bind(this, user._doc.createdEvents),
                    subs: Subscription.bind(this, user._doc.subs)
                }
            } catch (err) {
                throw err
            }
        },

        users: async (_, args, {
            req
        }) => {
            try {
                const users = await User.find()

                return users.map(user => {
                    return {
                        ...user._doc,
                        _id: user.id,
                        createdMembers: members.bind(this, user._doc.createdMembers),
                        createdEvents: events.bind(this, user._doc.createdEvents),
                        subs: Subscription.bind(this, user._doc.subs)
                    }
                })
            } catch (err) {
                throw err
            }
        },

        subs: async (_, args, {
            req
        }) => {
            try {
                const subs = await Sub.find()

                return subs.map(sub => {
                    return {
                        ...sub._doc,
                        _id: sub.id
                    }
                })
            } catch (err) {
                throw err
            }
        },

        rememberPass: async (_, args, {
            req
        }) => {
            try {
                const user = await User.findOne({
                    email: args.rememberPassInput.email
                })

                if (!user) {
                    throw new Error('No se encontro este usuario')
                }

                const userSecret = user.password + '-' + secret
                const resetPassToken = await jwt.sign({
                        userId: user._id
                    },
                    userSecret, {
                        expiresIn: '10m'
                    }
                )

                let userTorememberUpdated

                await User.findByIdAndUpdate(
                    user._id, {
                        $set: {
                            resetToken: resetPassToken
                        }
                    }, {
                        new: true,
                        upsert: true
                    },
                    function (err, user) {
                        if (err) {
                            console.log(err)
                        }

                        userTorememberUpdated = user._doc
                    }
                )
                console.log(userTorememberUpdated)

                //const finalUser = transformUser(userTorememberUpdated)

                return user
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        addSub: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                throw new Error('No Autorizado')
            }
            // throw new Error('No se encontró este usuario')

            try {
                const sub = await Sub.findOne({
                    endpoint: args.newSubInput.endpoint
                })

                if (!sub) {
                    const subscription = new Sub({
                        endpoint: args.newSubInput.endpoint,
                        expirationTime: args.newSubInput.expirationTime,
                        p256dhKey: args.newSubInput.p256dhKey,
                        authKey: args.newSubInput.authKey,
                        userId: req.userId
                    })
                    const result = await subscription.save()
                    let userToAddSub = await User.findByIdAndUpdate({
                        _id: req.userId
                    })

                    userToAddSub.subs.push(result)
                    await userToAddSub.save().then(async res => {

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
                                ...res._doc,
                                _id: res.id,
                                subs: transformSubIds(res._doc.subs)

                            }
                        })
                    })


                    return {
                        ...result._doc,
                        _id: result.id
                    }
                } else {

                    return transformSub(sub)
                }
            } catch (error) {
                console.log(error)
            }
        },
        createUser: async (_, args, {
            req
        }) => {
            // if (!req.isAuth) {
            //     throw new Error('No Autorizado')
            // }

            try {
                const existingUser = await User.findOne({
                    email: args.userInput.email
                })

                if (existingUser) {
                    throw new Error('Este usuario ya existe.')
                }
                const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
                const user = new User({
                    name: args.userInput.name,
                    email: args.userInput.email,
                    role: args.userInput.role,
                    password: hashedPassword
                })
                const result = await user.save()

                return {
                    ...result._doc,
                    password: null,
                    _id: result.id
                }
            } catch (err) {
                throw err
            }
        },

        deleteUser: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                throw new Error('No Autorizado')
            }
            let userToDelete
            try {
                const user = await User.findById(args.userId)
                if (!user) {
                    throw new Error('No se encontro el usuario para borrar')
                }
                userToDelete = transformUser(user)

                await User.deleteOne({
                    _id: args.userId
                })

                return userToDelete
            } catch (err) {
                throw err
            }
        }
    }
}