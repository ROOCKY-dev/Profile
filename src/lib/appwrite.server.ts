import { Client, Databases } from 'node-appwrite';

export function createAdminClient() {
  const endpoint = process.env.APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
  const projectId = process.env.APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'dummy-project';
  const apiKey = process.env.APPWRITE_API_KEY || 'dummy-key';

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    databases: new Databases(client),
  };
}

export const APPWRITE_DB_ID = process.env.APPWRITE_DB_ID || process.env.NEXT_PUBLIC_APPWRITE_DB_ID || 'portfolio';
export const APPWRITE_LOGS_COLLECTION_ID = process.env.APPWRITE_LOGS_COLLECTION_ID || process.env.NEXT_PUBLIC_APPWRITE_LOGS_COLLECTION_ID || 'logs';
