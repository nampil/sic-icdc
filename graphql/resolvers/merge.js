const DataLoader = require('dataloader')
const Event = require('../../model/event')
const Member = require('../../model/member');
const User = require('../../model/user');
const Sub = require('../../model/sub')
const {
    dateToString
} = require('../../helpers/date');


const eventLoader = new DataLoader((eventsIds) => {

    return events(eventsIds);
});

const memberLoader = new DataLoader((memberIds) => {
    return members(memberIds);
});

const userLoader = new DataLoader(UserIds => {
    return User.find({
        _id: {
            $in: UserIds
        }
    });
});

const subLoader = new DataLoader(subId => {
    return Sub.find({
        _id: {
            $in: subId
        }
    })
})


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

const singleEvent = async eventIds => {
    try {
        const event = await eventLoader.load(eventIds.toString());
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

const subs = async subsIds => {

    try {
        const subs = await Sub.find({
            _id: {
                $in: subsIds
            }
        })
        return subs.map(sub => {
            return transformSub(sub)
        })

    } catch (error) {
        throw error
    }
}


const user = async (userId) => {
    const user = await userLoader.load(userId.toString())

    try {
        return {
            ...user._doc,
            _id: user.id,
            createdMembers: () => memberLoader.loadMany(user.createdMembers),
            createdEvents: () => memberLoader.loadMany(user.createdEvents),
            subs: () => subLoader.loadMany(user.subs)
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

const transformSub = sub => {
    return {
        ...sub._doc,
        _id: sub.id
    }
}

exports.events = events;
exports.members = members;
exports.subs = subs;
exports.transformMember = transformMember;
exports.transformEvent = transformEvent;
exports.transformGuest = transformGuest;
exports.transformUser = transformUser;
exports.transformSub = transformSub;