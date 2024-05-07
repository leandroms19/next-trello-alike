import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher, redirectToSignIn, redirectToSignUp } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/board(.*)',
  '/api(.*)',
  '/organization(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if(auth().userId && !isProtectedRoute(req)){
    let path = "/select-org"

    if(auth().orgId){
      path = `/organization/${auth().orgId}`
    }

    const orgSelection = new URL(path, req.url);
  return NextResponse.redirect(orgSelection);
  }
  
  // Handle users who aren't authenticated
  
  if(isProtectedRoute(req)) auth().protect();
  // Redirect signed in users to organization selection page if they are not active in an organization
  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
  return NextResponse.redirect(orgSelection);
    
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};