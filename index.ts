import connectToMongoDB from "./config/mongodb.config";
import userTypeDefs from "./types/typeDefs/User.typeDefs";
import monetaryItemTypeDefs from "./types/typeDefs/MonetaryItem.typeDefs";
import userResolvers from "./resolvers/User.resolvers";
import monetaryItemResolvers from "./resolvers/MonetaryItem.resolvers";

import { configureApolloServer } from "./config/apolloServer.config";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
dotenv.config();

const apolloSchema = {
  typeDefs: [userTypeDefs, monetaryItemTypeDefs],
  resolvers: [userResolvers, monetaryItemResolvers],
};

connectToMongoDB().then(() => {
  const server = new ApolloServer(apolloSchema);
  configureApolloServer(server);
});
