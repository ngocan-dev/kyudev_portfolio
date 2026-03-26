import { redirect } from "next/navigation";

import { getAuthState } from "@/features/auth/authentication/get-auth-state";
import { ROLES } from "@/features/auth/constants/roles";

export async function requireAdmin() {
	const { userId, sessionClaims } = await getAuthState();

	if (!userId) {
		redirect("/sign-in");
	}

	if (sessionClaims?.metadata?.role !== ROLES.ADMIN) {
		redirect("/");
	}

	return { userId, sessionClaims };
}

export async function checkAdmin(): Promise<boolean> {
	try {
		const { sessionClaims } = await getAuthState();
		return sessionClaims?.metadata?.role === ROLES.ADMIN;
	} catch {
		return false;
	}
}
