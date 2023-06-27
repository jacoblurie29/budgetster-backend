import { startStandaloneServer } from "@apollo/server/standalone";
import type { ApolloServer } from "@apollo/server";

export const configureApolloServer = async (server: ApolloServer) => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000, host: "localhost" },
  });

  console.log(`🚀 [SERVER]: Server ready at ${url}`);
};
