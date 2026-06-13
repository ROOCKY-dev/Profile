"use server";

import { cookies } from "next/headers";

export async function login(passkey: string) {
    if (passkey === process.env.ADMIN_PASSPHRASE) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", { secure: true, httpOnly: true, path: "/" });
        return { success: true };
    }
    return { success: false, error: "Invalid passkey" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
}
