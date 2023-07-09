import { gql } from "apollo-server";

const monetaryItemTypeDefs = gql`
  type MonetaryItem {
    _id: String!
    name: String!
    value: Float!
    date: String!
    repeat: Boolean!
    repeatPeriod: String
    repeatEndDate: String
    type: String!
  }

  input MonetaryItemUpdate {
    _id: String!
    name: String!
    value: Float!
    date: String!
    repeat: Boolean!
    repeatPeriod: String
    repeatEndDate: String
    type: String!
  }

  input MonetaryItemInput {
    name: String!
    value: Float!
    date: String!
    repeat: Boolean!
    repeatPeriod: String
    repeatEndDate: String
    type: String!
  }

  type MonetaryItemDeleteResponse {
    deletedCount: Int!
  }

  type Query {
    getMonetaryItems(limit: Int): [MonetaryItem]
    getMonetaryItem(_id: String!): MonetaryItem
    getMonetaryItemsByType(type: String!): [MonetaryItem]
  }

  type Mutation {
    createMonetaryItem(monetaryItem: MonetaryItemInput): MonetaryItem
    updateMonetaryItem(monetaryItem: MonetaryItemUpdate): MonetaryItem
    deleteMonetaryItem(_id: String!): MonetaryItem
    deleteMonetaryItems(_ids: [String]!): MonetaryItemDeleteResponse
  }
`;

export default monetaryItemTypeDefs;
