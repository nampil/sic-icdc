const Guest = require('../../model/guest');
const User = require('../../model/user');
const {
    transformGuest
} = require('./merge');

module.exports = {
    Query: {
        guests: async (_, args, {
            req
        }) => {

            if (!req.isAuth) {
                console.log("No Paso autorizacion fetching guests")
                throw new Error('No Autorizado')
            }

            try {
                const guests = await Guest.find(args)
                return guests.map(guest => {
                    return transformGuest(guest)
                })

            } catch (err) {

                throw err
            }
        }
    },
    Mutation: {
        createGuest: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                console.log("No Paso autorizacion fetching guests")
                throw new Error('No Autorizado')
            }

            const guest = new Guest({
                name: args.guestInput.name,
                tel: args.guestInput.tel,
                email: args.guestInput.email,
                bdate: args.guestInput.bdate ? new Date(args.guestInput.bdate) : null,
                gender: args.guestInput.gender,
                invitedBy: args.guestInput.invitedBy,
                createdBy: req.userId
            });
            let createdGuest;
            try {

                const result = await guest.save();
                console.log(result);
                createdGuest = transformGuest(result);
                console.log(createdGuest);

                return createdGuest

            } catch (err) {
                console.log(err);
                throw err;

            }
        },

        deleteGuest: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                throw new Error('No Autorizado')
            }
            let guestToDelete;
            try {
                const guest = await Guest.findById(args.guestId)
                if (!guest) {
                    throw new Error('No se encontro el guest para borrar')
                }

                guestToDelete = transformGuest(guest);

                await Guest.deleteOne({
                    _id: args.guestId
                })
                return guestToDelete

            } catch (err) {
                console.error(err);
                throw err;



            }
        },

        updateGuest: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                console.log("No Paso autorizacion update guest")
                throw new Error('No Autorizado')
            }

            let updatedGuest;
            try {
                const guest = await Guest.findById(args.guestId)
                if (!guest) {
                    throw new Error('No se encontro el guest para actualizar')
                }

                guest.name = args.guestInput.name,
                    guest.tel = args.guestInput.tel,
                    guest.email = args.guestInput.email,
                    guest.bdate = args.guestInput.bdate,
                    guest.gender = args.guestInput.gender,
                    guest.invitedBy = args.guestInput.invitedBy,
                    guest.createdBy = req.userId

                const result = await guest.save();
                console.log(result);
                updatedGuest = transformGuest(result);

                return updatedGuest

            } catch (err) {
                console.log(err);
                throw err;

            }
        }
    }
}