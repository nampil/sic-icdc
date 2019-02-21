const bcrypt = require('bcryptjs');
const User = require('../../model/user')
const {
    events,
    members,
    transformUser
} = require('../resolvers/merge')

const jwt = require('jsonwebtoken');

module.exports = {

    Query: {
        login: async (_, args, req) => {


            const user = await User.findOne({
                email: args.email
            });
            if (!user) {
                throw new Error('Invalid credencials');
            }
            const isEqual = await bcrypt.compare(args.password, user.password)
            if (!isEqual) {
                throw new Error('Invalid credencials');
            }
            const token = await jwt.sign({
                userId: user.id,
                email: user.email
            }, '17abdi.sofi23.SECRET', {
                expiresIn: '1h'
            });
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




            const authHeader = req.get('Authorization');

            const oldToken = authHeader.split(' ')[1];

            let decodedOldToken;
            try {
                decodedOldToken = jwt.verify(oldToken, '17abdi.sofi23.SECRET')
            } catch (err) {

            }

            if (decodedOldToken) {
                const newtoken = await jwt.sign({
                    userId: decodedOldToken.userId,
                    email: decodedOldToken.email
                }, '17abdi.sofi23.SECRET', {
                    expiresIn: '1h'
                });

                const user = await User.findOne({
                    email: decodedOldToken.email
                });




                return {
                    userId: decodedOldToken.userId,
                    token: newtoken,
                    tokenExpiration: 1,
                    role: user.role,
                    name: user.name

                }

            }

        },

        user: async (
            _, args, {
                req
            }
        ) => {



            try {
                const user = await User.findOne(args);


                if (!user) {
                    throw new Error('No se encontró este usuario')
                }

                return {
                    ...user._doc,
                    _id: user.id,
                    createdMembers: members.bind(this, user._doc.createdMembers),
                    createdEvents: events.bind(this, user._doc.createdEvents)
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
                        createdEvents: events.bind(this, user._doc.createdEvents)
                    }
                })

            } catch (err) {
                throw err
            }
        },

    },

    Mutation: {
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
                });
                const result = await user.save();

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
            let userToDelete;
            try {

                const user = await User.findById(args.userId)
                if (!user) {
                    throw new Error('No se encontro el usuario para borrar')
                }
                userToDelete = transformUser(user);

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