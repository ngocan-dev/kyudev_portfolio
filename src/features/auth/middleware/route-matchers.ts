import { createRouteMatcher } from "@clerk/nextjs/server";

export const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
export const isAdminRoute = createRouteMatcher(["/admin(.*)", "/cms(.*)"]);
export const isPublicRoute = createRouteMatcher([
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/",
	"/api(.*)",
	"/repository(.*)",
	"/projects(.*)",
]);
