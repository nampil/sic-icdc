const DataLoader = require('dataloader')

const Member = require('../../model/member');
const User = require('../../model/user');
const {
    dateToString
} = require('../../helpers/date');


const eventLoader = new DataLoader((eventsIds) => {
    console.log
    return events(eventsIds);
});


const events = async eventIds => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIds
            }
        });
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        const event = await eventLoader(eventId);
        return event
    } catch (err) {
        throw err;
    }
};

const members = async membersIds => {
    try {
        const members = await Member.find({
            _id: {
                $in: membersIds
            }
        });
        return members.map(member => {
            return transformMember(member);
        });

    } catch (err) {
        throw err
    };
};


const user = async (userId) => {
    const user = await User.findById(userId)

    try {
        return {
            ...user._doc,
            _id: user.id,
            createdMembers: members.bind(this, user.createdMembers)
        };
    } catch (err) {
        throw err;
    }
};

const transformMember = member => {

    return {
        ...member._doc,
        _id: member.id,
        bdate: dateToString(member._doc.bdate),
        createdBy: user.bind(this, member.createdBy)
    }
};
const transformUser = user => {

    return {
        ...user._doc,
        _id: user.id
    }
};

const transformEvent = event => {

    return {
        ...event._doc,
        _id: event.id,
        endDate: dateToString(event._doc.endDate),
        eventDate: dateToString(event._doc.eventDate),
        createdBy: user.bind(this, event.createdBy)
    };
};
const transformGuest = guest => {

    return {
        ...guest._doc,
        _id: guest.id,
        bdate: guest._doc.bdate ? dateToString(guest._doc.bdate) : null,
        createdBy: user.bind(this, guest.createdBy)
    };
};

//exports.user = user;
exports.members = members;
exports.transformMember = transformMember;
exports.transformEvent = transformEvent;
exports.transformGuest = transformGuest;
exports.transformUser = transformUser;