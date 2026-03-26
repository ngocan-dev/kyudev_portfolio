import { getAuthState } from "@/features/auth/authentication/get-auth-state";
import type { Role } from "@/features/auth/constants/roles";

export const checkRole = async (role: Role) => {
	const { sessionClaims } = await getAuthState();
	return sessionClaims?.metadata?.role === role;
};
