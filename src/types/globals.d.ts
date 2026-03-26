import type { Role } from "@/features/auth/constants/roles";

export {};

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			onboardingComplete?: boolean;
			role?: Role;
		};
	}
}
