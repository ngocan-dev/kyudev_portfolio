export const ROLES = {
	ADMIN: "admin",
	MODERATOR: "moderator",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
