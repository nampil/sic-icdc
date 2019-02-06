const Member = require('../../model/member');
const User = require('../../model/user');

const {
    transformMember
} = require('./merge')



module.exports = {
    members: async (args, req) => {
        if (!req.isAuth) {
            console.log("No Paso autorizacion fetching members")
            throw new Error('No Autorizado')
        }
        try {
            const members = await Member.find(args)

            return members.map(member => {

                return transformMember(member);

            })
        } catch (err) {
            throw err
        };
    },
    createMember: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('No Autorizado')
        }
        console.log(args.memberInput.tel)
        const member = new Member({
            name: args.memberInput.name,
            tel: args.memberInput.tel,
            email: args.memberInput.email,
            address: args.memberInput.address,
            bdate: new Date(args.memberInput.bdate),
            relatives: args.memberInput.relatives,
            gender: args.memberInput.gender,
            serveIn: args.memberInput.serveIn,
            createdBy: req.userId
        });
        let createdMembers;
        try {
            const result = await member.save()

            createdMembers = transformMember(result);
            const creator = await User.findById(req.userId);

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
    deleteMember: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('No Autorizado')
        }
        let memberToDelete;
        try {

            const member = await Member.findById(args.memberId)
            if (!member) {
                throw new Error('No se encontro el miembro para borrar')
            }
            memberToDelete = transformMember(member);

            await Member.deleteOne({
                _id: args.memberId
            })
            return memberToDelete
        } catch (err) {
            throw err

        }
    },
    updateMember: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('No Autorizado')
        }

        try {

            const member = await Member.findById(args.memberId)
            if (!member) {
                throw new Error('No se encontro el miembro para actualizar')
            }


            member.name = args.memberInputUpdate.name
            member.email = args.memberInputUpdate.email
            member.tel = args.memberInputUpdate.tel
            member.address = args.memberInputUpdate.address
            member.bdate = args.memberInputUpdate.bdate
            member.gender = args.memberInputUpdate.gender
            member.serveIn = args.memberInputUpdate.serveIn
            member.relatives = args.memberInputUpdate.relatives
            member.createdBy = req.UserId

            await member.save()
            return member
        } catch (err) {
            throw err

        }
    }
}