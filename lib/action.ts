import { GraphQLClient } from "graphql-request";
import { createUserMutation, getUserQuery } from "@/graphql";

// check if connection is in production or devlopment
const isproduction = process.env.NODE_ENV === "production";

const apiUrl = isproduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : "http://localhost:/127.0.0.1:4000/graphql";

const apikey = isproduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "graphql";

const serverUrl = isproduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphqlRequest = async (query: any, variable = {}) => {
    try {
        return await client.request(query, variable)
    } catch (error: any) {
        console.log(error.message)
    }
};

export const getUser = async (email: string) => {
    client.setHeader('x-api-key', apikey)
    return await makeGraphqlRequest(getUserQuery, { email })
}

export const createUser = async (email: string, name: string, avataUrl: string) => {
    client.setHeader('x-api-key', apikey)
    const variables = {
        input: {
            email,
            name,
            avataUrl
        }
    }
    return makeGraphqlRequest(createUserMutation, variables)
} 
