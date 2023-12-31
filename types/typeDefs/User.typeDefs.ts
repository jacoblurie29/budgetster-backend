import { gql } from "apollo-server";

const userTypeDefs = gql`
  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    budget: Float!
    password: String
    authToken: String!
    refreshToken: String!
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

  input RefreshTokenInput {
    refreshToken: String!
  }

  type Query {
    getUser: User
    refreshToken(refreshTokenInput: RefreshTokenInput): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    updateUserBudget(budget: Float!): User
  }
`;

export default userTypeDefs;
