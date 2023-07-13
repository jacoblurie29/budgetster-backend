import context from "../context/context";
import { startStandaloneServer } from "@apollo/server/standalone";
import type { BudgetsterContext } from "../types/types";
import type { ApolloServer } from "@apollo/server";

export const configureApolloServer = async (
  server: ApolloServer<BudgetsterContext>
) => {
  const { url } = await startStandaloneServer<BudgetsterContext>(server, {
    listen: { port: 4010, host: "localhost" },
    /* Comment out the line below to remove all auth from the app */
    context: context,
  });

  console.log(`🚀 [SERVER]: Server ready at ${url}`);
};
