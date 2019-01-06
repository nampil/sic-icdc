const Member = require('../../model/member');
const User = require('../../model/user');

const {
    transforMember
} = require('./merge')



module.exports = {
    members: async (args) => {
        try {
            const members = await Member.find(args)

            return members.map(member => {
                return transforMember(member);
            })
        } catch (err) {
            throw err
        };
    },
    createMember: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('No Autorizado')
        }
        const member = new Member({
            name: args.memberInput.name,
            address: args.memberInput.address,
            bdate: new Date(args.memberInput.bdate),
            relatives: args.memberInput.relatives,
            gender: args.memberInput.gender,
            serveIn: args.memberInput.serveIn,
            createdBy: req.UserId
        });
        let createdMembers;
        try {
            const result = await member
                .save()

            createdMembers = transforMember(result);
            const creator = await User.findById(req.UserId);

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdMembers.push(member);
            await creator.save();


            return createdMembers

        } catch (err) {
            throw err
        }
    },
    deleteMember: async args => {
        let memberToDelete;
        try {

            const member = await Member.findById(args.memberId)
            if (!member) {
                throw new Error('No se encontro el miembro para borrar')
            }
            memberToDelete = transforMember(member);

            await Member.deleteOne({
                _id: args.memberId
            })
            return memberToDelete
        } catch (err) {
            throw err

        }
    }
}