const Event = require('../../model/event');
const User = require('../../model/user');
const Sub = require('../../model/sub')
const webpush = require('web-push')
const pubsub = require('../resolvers/pupsub');

const NEW_EVENT = 'new_event_created'

const {
    transformEvent
} = require('./merge');

module.exports = {

    Query: {
        events: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                throw new Error(JSON.stringify(req));
            }
            try {
                const events = await Event.find();


                return events.map(event => {

                    return transformEvent(event);
                });
            } catch (err) {
                throw err;
            }
        },
    },

    Mutation: {
        createEvent: async (_, args, {
            req
        }) => {

            if (!req.isAuth) {
                throw new Error('Unauthenticated!');
            }

            const event = new Event({
                title: args.eventInput.title,
                eventDate: args.eventInput.eventDate,
                endDate: args.eventInput.endDate,
                place: args.eventInput.place,
                description: args.eventInput.description,
                orgScope: args.eventInput.orgScope,
                cordinator: args.eventInput.cordinator,
                staffAuv: args.eventInput.staffAuv,
                staffMav: args.eventInput.staffMav,
                staffProto: args.eventInput.staffProto,
                staffDarte: args.eventInput.staffDarte,
                staffEci: args.eventInput.staffEci,
                staffVar: args.eventInput.staffVar,
                createdBy: req.userId,
            });


            let createdEvent;
            try {
                const result = await event.save();

                createdEvent = await transformEvent(result);

                const creator = await User.findById(req.userId);


                if (!creator) {
                    throw new Error('User not found.');
                }
                creator.createdEvents.push(event);
                await creator.save()

                console.log(createdEvent.title);

                pubsub.publish(NEW_EVENT, {
                    newEvent: {
                        ...createdEvent,
                        createdBy: {
                            _id: creator._doc._id,
                            name: creator._doc.name
                        }
                    }
                })

                // const subs = await Sub.find()

                // subs.map(sub => {
                //     const payload = JSON.stringify({
                //         title: "Nuevo Evento en ICDC",
                //         body: `Avisa a Nohel por fa`
                //     });

                //     const subcription = {
                //         endpoint: sub.endpoint,
                //         expirationTime: sub.expirationTime,
                //         keys: {
                //             p256dh: sub.p256dhKey,
                //             auth: sub.authKey
                //         }
                //     }
                //     // Pass object into sendNotification
                //     webpush
                //         .sendNotification(subcription, payload)
                //         .catch(err => console.error(err));

                // })

                return createdEvent;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },


        deleteEvent: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                throw new Error('No Autorizado')
            }



            let eventToDelete;
            try {

                const event = await Event.findById(args.eventId)

                if (!event) {
                    throw new Error('No se encontro el evento para borrar')
                }
                eventToDelete = transformEvent(event);

                await Event.deleteOne({
                    _id: args.eventId
                })

                await User.findByIdAndUpdate(event.createdBy, {
                    $pullAll: {
                        createdEvents: [event._id]
                    }
                })

                return eventToDelete
            } catch (err) {
                throw err

            }
        },
        updateEvent: async (_, args, {
            req
        }) => {
            if (!req.isAuth) {
                throw new Error('No Autorizado');
            }

            try {
                const event = await Event.findById(args.eventId)
                if (!event) {
                    throw new Error('No se encontro el miembro para actualizar')
                }


                event.title = args.eventInput.title,
                    event.eventDate = args.eventInput.eventDate,
                    event.endDate = args.eventInput.endDate,
                    event.place = args.eventInput.place,
                    event.description = args.eventInput.description,
                    event.orgScope = args.eventInput.orgScope,
                    event.cordinator = args.eventInput.cordinator,
                    event.staffAuv = args.eventInput.staffAuv,
                    event.staffMav = args.eventInput.staffMav,
                    event.staffProto = args.eventInput.staffProto,
                    event.staffDarte = args.eventInput.staffDarte,
                    event.staffEci = args.eventInput.staffEci,
                    event.createdBy = req.userId


                const result = await event.save()
                createdEvent = transformEvent(result)
                return createdEvent;

            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
};