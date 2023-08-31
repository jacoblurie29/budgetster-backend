import context from "../context/context";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import type { BudgetsterContext } from "../types/types";
import type { ApolloServer } from "@apollo/server";
dotenv.config();

export const configureApolloServer = async (
  server: ApolloServer<BudgetsterContext>
) => {
  const { url } = await startStandaloneServer<BudgetsterContext>(server, {
    listen: {
      port: Number(process.env.PORT) || 8080,
      host: process.env.HOST || "localhost",
    },
    /* Comment out the line below to remove all auth from the app */
    context: context,
  });

  console.log(`🚀 [SERVER]: Server ready at ${url}`);
};
