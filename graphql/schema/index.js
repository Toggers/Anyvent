const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Ticket{
    _id:ID!
    ticketNum: String!
    event: Event!
    user: User!
    date: String!
}

type Event {
    _id: ID!
    category: String!
    title: String!
    description: String!
    address_location: String!
    address_city: String!
    address_state: String!
    address_zipcode: Int!
    capacity: Int!
    price: Float!
    eventDate: String!
    date:String!
    imageURL: String!

    author: User


        
 }

input EventInput {
    category: String!
    title: String!
    description: String!
    address_location: String!
    address_city: String!
    address_state: String!
    address_zipcode: Int!
    capacity: Int!
    price: Float!
    eventDate: String!
    date: String!
    imageURL: String!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input UserInput {
    email: String!
    password: String!
}

type RootQuery {
    events: [Event!]!
    login(email: String!, password: String!): AuthData!
    tickets: [Ticket!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createTicket(eventID: ID!): Ticket
    cancelTicket(ticketID: ID!): Event
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

