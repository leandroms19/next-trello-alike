import { NextResponse } from "next/server";
import { authMiddleware, clerkMiddleware, createRouteMatcher, redirectToSignIn } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/board(.*)",
  "/api(.*)",
  "/organization(.*)",
]);

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
  if (!auth.userId && !auth.isPublicRoute){
    return redirectToSignIn({returnBackUrl: req.url})
  }

  // Redirect signed in users to organization selection page if they are not active in an organization
  if (
    auth.userId &&
    !auth.orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

  if (auth.userId && auth.isPublicRoute) {
    let path = "/select-org";

    if (auth.orgId) {
      path = `/organization/${auth.orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  /*if(auth().userId && isProtectedRoute(req)){
    let path = ''
    if(auth().orgId){
    path = `/organization/${auth().orgId}`
    const orgSelection = new URL(path, req.url);
  return NextResponse.redirect(orgSelection);
    }
  }*/

  },
});  

/*if(auth().userId && isProtectedRoute(req)){
    let path = ''
    if(auth().orgId){
    path = `/organization/${auth().orgId}`
    const orgSelection = new URL(path, req.url);
  return NextResponse.redirect(orgSelection);
    }

    
  }
  */

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
