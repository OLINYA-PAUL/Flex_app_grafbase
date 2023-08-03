import { GraphQLClient } from "graphql-request";

// compare if application is in production or development using graphQL

const production = process.env.NODE_ENV === "production";

const apiUrl = production
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1/4000/graphql";

const apiKey = production
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

const serverUrl = production
  ? process.env.NEXT_PUBLIC_SERVER_URL || ""
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);
const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    // make a client request from GraphQL data base.
    return await client.request(query, variables);
  } catch (error: any) {
    throw error.message;
  }
};
