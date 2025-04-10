import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isOnboardingRoute = createRouteMatcher(['/onboarding(.*)'])
const isPublicRoute = createRouteMatcher(['/','/login','/signup'])
export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth()


  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next()
  }
  // If the user isn't signed in, let them proceed (they'll be redirected to sign-in by other middleware)
  if (!userId && !isPublicRoute(req)) return NextResponse.redirect(new URL('/login',req.url))

  // For users visiting /onboarding, don't try to redirect
  

  // If user is logged in but not in an org, redirect them to onboarding
  if (userId && !orgId) {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}