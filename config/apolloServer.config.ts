import { startStandaloneServer } from "@apollo/server/standalone";

export const configureApolloServer = async (server: any) => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000, host: "localhost" },
  });

  console.log(`[SERVER]: 🚀 Server ready at ${url}`);
};
