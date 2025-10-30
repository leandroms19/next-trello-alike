import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/board(.*)",
  "/api(.*)",
  "/organization(.*)",
]);

const publicAuthRoutes = ["/sign-in", "/sign-up"];

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth(); 
  const pathname = req.nextUrl.pathname; 


  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  
  if (userId && !orgId && pathname !== "/select-org") {
    return NextResponse.redirect(new URL("/select-org", req.url));
  }

  
  if (
    userId &&
    !isProtectedRoute(req) &&
    !publicAuthRoutes.includes(pathname)
  ) {
    const path = orgId ? `/organization/${orgId}` : "/select-org";
    return NextResponse.redirect(new URL(path, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
