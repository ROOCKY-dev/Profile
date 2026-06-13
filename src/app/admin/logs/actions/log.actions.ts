"use server";

import { createAdminClient, APPWRITE_DB_ID, APPWRITE_LOGS_COLLECTION_ID } from "@/lib/appwrite.server";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";

async function verifyAuth() {
    const cookieStore = await cookies();
    if (!cookieStore.get("admin_session")) {
        throw new Error("Unauthorized");
    }
}

export async function getAdminLogs() {
    await verifyAuth();
    const { databases } = createAdminClient();
    const response = await databases.listDocuments(
        APPWRITE_DB_ID,
        APPWRITE_LOGS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(100)]
    );
    return response.documents;
}

export async function createAdminLog(timeText: string, eventText: string) {
    await verifyAuth();
    const { databases } = createAdminClient();
    await databases.createDocument(
        APPWRITE_DB_ID,
        APPWRITE_LOGS_COLLECTION_ID,
        ID.unique(),
        { time: timeText, event: eventText }
    );
}

export async function updateAdminLog(id: string, timeText: string, eventText: string) {
    await verifyAuth();
    const { databases } = createAdminClient();
    await databases.updateDocument(
        APPWRITE_DB_ID,
        APPWRITE_LOGS_COLLECTION_ID,
        id,
        { time: timeText, event: eventText }
    );
}

export async function deleteAdminLog(id: string) {
    await verifyAuth();
    const { databases } = createAdminClient();
    await databases.deleteDocument(
        APPWRITE_DB_ID,
        APPWRITE_LOGS_COLLECTION_ID,
        id
    );
}
