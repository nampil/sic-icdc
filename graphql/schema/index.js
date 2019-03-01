const typeDefs = `

type Subscription {
    newEvent: Event
    userUpdated: User
}

type Notification{
    title: String!
    msg: String!
    subId: String!
}

type Member {
    _id: ID!
    name: String!
    tel: String
    email: String
    address: String
    bdate: String
    relatives: [String]
    gender: String
    serveIn: [String]
    createdBy: User!
    
}



type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    role: Int!
    subs: [Sub]
    createdMembers: [Member!]
    createdEvents: [Event!]
}

type Sub {
    _id: ID
    endpoint: String
    expirationTime: Int
    p256dhKey: String
    authKey: String
    userId: String
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
    name: String!
    role: Int!
}

type Guest{
    _id: ID!
    name: String!
    tel: String
    email: String
    bdate: String
    gender: String
    invitedBy: String
    createdBy: User!
}

type Event {
    _id: ID!
    title: String!
    eventDate: String!
    endDate: String!
    place: String!
    orgScope: String!
    description: String
    cordinator: String
    memberAsist: [Member!]
    guests:[Guest!]
    staffAuv:[String]
    staffMav:[String]
    staffProto:[String]
    staffDarte:[String]
    staffEci: [String]
    staffVar: [String]
    createdBy: User!
    active: Boolean!
    createdAt: String!
    updatedAt: String!
}

input EventInput {
    title: String!
    eventDate: String!
    endDate: String!
    place: String!
    orgScope: String!
    description: String
    cordinator: String
    staffAuv:[String]
    staffMav:[String]
    staffProto:[String]
    staffDarte:[String]
    staffEci: [String]
    staffVar: [String]
}
input EventAsistInput {
    memberAsist: [MemberInput!]
}

input UserInput{
    name: String!
    email: String!
    password: String!
    role: Int!
}

input MemberInput {
    name: String!
    tel: String
    email: String
    address: String!
    bdate: String!
    relatives: [String]
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
input EventInputUpdate{
    title: String
    eventDate: String
    endDate: String
    place: String
    description: String
    cordinator: String
    staffAuv:[String]
    staffMav:[String]
    staffProto:[String]
    staffDarte:[String]
    staffEci: [String]
    staffVar: [String]
}

input GuestInput{
    name: String!
    tel: String
    email: String
    bdate: String
    gender: String
    invitedBy: String
}

input NewSubInput{
    endpoint: String!
    expirationTime: Int
    p256dhKey: String
    authKey: String

}

input SendNotificationInput {
    subsIds: [String!]!
    title: String!
    msg: String!
}

type RootQuery {
    subs: [Sub!]!
    guests: [Guest!]!
    members:[Member!]!
    users: [User!]!
    user(name: String, _id: String): User!
    login(email: String!, password: String!): AuthData
    relogin:AuthData!
    events: [Event!]!
    sendNotification(sendNotificationInput: SendNotificationInput): Notification
}
type RootMutation {
    addSub(newSubInput: NewSubInput): Sub
    createGuest(guestInput: GuestInput): Guest
    updateGuest(guestId: ID! guestInput: GuestInput): Guest!
    deleteGuest(guestId: ID!): Guest!
    createEvent(eventInput: EventInput): Event
    addMembersAsistToEvent(eventAsistInput: EventAsistInput, eventId: ID!): Event
    createMember(memberInput: MemberInput): Member
    createUser(userInput: UserInput): User
    deleteUser(userId: ID!): User!
    deleteMember(memberId: ID!): Member!
    deleteEvent(eventId: ID!): Event!
    updateMember(memberId: ID!, memberInputUpdate: MemberInputUpdate): Member!
    updateEvent(eventId: ID!, eventInput: EventInput): Event!
}
schema {
        query: RootQuery
        mutation: RootMutation
        subscription: Subscription
    }
`
module.exports.typeDefs = typeDefs