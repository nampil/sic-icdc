const Member = require('../../model/member');
const User = require('../../model/user');
const {
    dateToString
} = require('../../helpers/date');

const members = async membersIds => {
    try {
        const members = await Member.find({
            _id: {
                $in: membersIds
            }
        });
        return members.map(member => {
            return transforMember(member);
        });

    } catch (err) {
        throw err
    };
};


const user = async userId => {
    const user = await User.findById(userId)
    try {
        return { ...user._doc,
            _id: user.id,
            createdMembers: members.bind(this, user.createdMembers)
        };
    } catch (err) {
        throw err;
    }
};

const transforMember = member => {
    return { ...member._doc,
        _id: member.id,
        bdate: dateToString(member._doc.bdate),
        createdBy: user.bind(this, member.createdBy)
    }
};

//exports.user = user;
exports.members = members;
exports.transforMember = transforMember;