import authConfig from '@/app/auth.config'
import NextAuth from 'next-auth'

type PathMatcher = (route: string) => boolean

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { pathname: urlPathname } = req.nextUrl
  const isAuthRoute = urlPathname.startsWith('/auth')
  const isApiAuthRoute = urlPathname.startsWith('/api/auth')

  const isLoggedIn = !!req.auth

  const pathMatcher: PathMatcher = route => {
    const withoutStarRoute = route.slice(0, -1)
    return route.at(-1) === '*' ? urlPathname.startsWith(withoutStarRoute) : urlPathname === route
  }

  const doRedirection: (url: string) => Response = url => Response.redirect(new URL(url, req.nextUrl)) 

  if(isLoggedIn) {
    if(isAuthRoute)
      return doRedirection('/')
    return null
  }

  if(isApiAuthRoute || publicRoutes.some(pathMatcher))
    return null

  return doRedirection('/auth/signin')
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}

const publicRoutes = [
  '/',
  '/posts*'
]