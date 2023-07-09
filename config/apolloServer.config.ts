import context from "../context/context";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { ApolloServer } from "@apollo/server";

export const configureApolloServer = async (server: ApolloServer) => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4010, host: "localhost" },
    context: context,
  });

  console.log(`🚀 [SERVER]: Server ready at ${url}`);
};
