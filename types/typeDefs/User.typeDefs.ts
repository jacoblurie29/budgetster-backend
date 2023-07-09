import { gql } from "apollo-server";

const userTypeDefs = gql`
  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    token: String!
    monetaryItems: [MonetaryItem]
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUser(_id: String!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;

export default userTypeDefs;
