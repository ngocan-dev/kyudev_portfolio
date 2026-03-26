import { auth } from "@clerk/nextjs/server";

import type { AppSessionClaims } from "@/features/auth/types/session-claims";

export async function getAuthState() {
	const { userId, sessionClaims, redirectToSignIn } = await auth();

	return {
		userId,
		sessionClaims: sessionClaims as AppSessionClaims,
		redirectToSignIn,
	};
}
