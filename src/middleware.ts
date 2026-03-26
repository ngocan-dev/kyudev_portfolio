import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { ROLES } from "@/features/auth/constants/roles";
import { isAdminRoute, isOnboardingRoute, isPublicRoute } from "@/features/auth/middleware/route-matchers";

export default clerkMiddleware(async (auth, req) => {
	const { userId, sessionClaims, redirectToSignIn } = await auth();

	if (userId && isOnboardingRoute(req)) {
		return NextResponse.next();
	}

	if (!userId && !isPublicRoute(req)) {
		return redirectToSignIn({ returnBackUrl: req.url });
	}

	if (isAdminRoute(req)) {
		if (!userId) {
			return redirectToSignIn({ returnBackUrl: req.url });
		}

		if (sessionClaims?.metadata?.role !== ROLES.ADMIN) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	}

	if (userId && !sessionClaims?.metadata?.onboardingComplete && !isAdminRoute(req)) {
		return NextResponse.redirect(new URL("/onboarding", req.url));
	}

	if (userId && !isPublicRoute(req)) {
		return NextResponse.next();
	}
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|mp4|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf)).*)",
		"/(api|trpc)(.*)",
	],
};
