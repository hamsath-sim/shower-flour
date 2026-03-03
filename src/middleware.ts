import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
    const isOnAdminSubroute = req.nextUrl.pathname.startsWith("/admin/")

    if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/login", req.nextUrl))
    }

    if (isOnAdminSubroute && (!isLoggedIn || (req.auth?.user as { role?: string }).role !== "ADMIN")) {
        return Response.redirect(new URL("/admin", req.nextUrl))
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
