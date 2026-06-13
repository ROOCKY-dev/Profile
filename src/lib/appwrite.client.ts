import { Client, Account, Databases } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'dummy-project';

export const appwriteClient = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(appwriteClient);
export const databases = new Databases(appwriteClient);

// Configuration constants
export const APPWRITE_DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID || 'portfolio';
export const APPWRITE_LOGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_LOGS_COLLECTION_ID || 'logs';
