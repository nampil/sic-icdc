const {
    buildSchema
} = require('graphql');

module.exports = buildSchema(`
type Member {
    _id: ID!
    name: String!
    tel: String
    email: String
    address: String!
    bdate: String!
    relatives: [String!]
    gender: String
    serveIn: [String]
    createdBy: User!
    
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    createdMembers: [Member!]
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input UserInput{
    name: String!
    email: String!
    password: String!
}

input MemberInput {
    name: String!
    tel: String
    email: String
    address: String!
    bdate: String!
    relatives: [String!]
    gender: String
    serveIn: [String]

}

input MemberInputUpdate {
    name: String
    tel: String
    email: String
    address: String
    bdate: String
    relatives: [String]
    gender: String
    serveIn: [String]

}

type RootQuery {
    members(_id: ID,
        name: String,
        tel: String,
        email: String,
        address: String,
        bdate: String,
        relatives: [String!],
        gender: String,
        serveIn: [String]): [Member!]!
    users: [User!]!
    user(name: String, userId: String): User!
    login(email: String!, password: String!): AuthData!
    relogin:AuthData!
}
type RootMutation {
    createMember(memberInput: MemberInput): Member
    createUser(userInput: UserInput): User
    deleteMember(memberId: ID!): Member!
    updateMember(memberId: ID!, memberInputUpdate: MemberInputUpdate): Member!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);