import type { Role } from "@/features/auth/constants/roles";

export interface AppSessionClaims {
	metadata?: {
		onboardingComplete?: boolean;
		role?: Role;
	};
}
