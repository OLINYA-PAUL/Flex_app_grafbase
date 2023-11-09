import { GraphQLClient } from "graphql-request";
import { createProjectMutation, createUserMutation, getUserQuery, projectsQuery } from "@/graphql";
import { ProjectForm } from "@/common.types";

// check if connection is in production or devlopment
const isproduction = process.env.NODE_ENV === "production";

const apiUrl = isproduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : " http://127.0.0.1:4000/graphql";

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


export const getUserToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.token) {
            return { token: data.token };
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error: any) {
        console.error(error.message);
        throw error;

    }
};


const uploadImage = async (imagepath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: imagepath })
        })

        return await response.json();

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`)

        const variables = {
            input: {
                ...form,
                Image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        }
        return makeGraphqlRequest(createProjectMutation, variables)
    }
}

export const fetchAllProject = async (category?: String, endcursor?: String) => {
    client.setHeader('x-api-key', apikey)

    return makeGraphqlRequest(projectsQuery, { category, endcursor })

}