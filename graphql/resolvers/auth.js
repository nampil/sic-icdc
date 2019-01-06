const bcrypt = require('bcryptjs');
const User = require('../../model/user')
const {
    members
} = require('../resolvers/merge')

const jwt = require('jsonwebtoken');

module.exports = {
    user: async ({
        args
    }) => {

        try {
            const user = await User.findOne({
                args
            });


            if (!user) {
                throw new Error('No se encontró este usuario')
            }

            return { ...user._doc,
                _id: user.id,
                createdMembers: members.bind(this, user._doc.createdMembers)
            }

        } catch (err) {
            throw err
        }
    },
    users: async () => {

        try {
            const users = await User.find()


            return users.map(user => {

                return { ...user._doc,
                    _id: user.id,
                    createdMembers: members.bind(this, user._doc.createdMembers)
                }
            })

        } catch (err) {
            throw err
        }
    },

    createUser: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('No Autorizado')
        }

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
                password: hashedPassword
            });
            const result = await user.save();

            return { ...result._doc,
                password: null,
                _id: result.id
            }
        } catch (err) {
            throw err
        }

    },
    login: async ({
        email,
        password
    }) => {
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            throw new Error('Invalid credencials');
        }
        const isEqual = await bcrypt.compare(password, user.password)
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
            tokenExpiration: 1
        }

    }
}