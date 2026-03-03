import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as { id: string }).id;
                token.role = (user as { role?: string }).role;
                token.phone = (user as { phone?: string }).phone;
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as { role?: string }).role = token.role as string;
                (session.user as { phone?: string }).phone = token.phone as string;
            }
            return session
        },
    },
    providers: [
        // We'll leave this empty here and add the full Credentials provider in auth.ts
        // Middleware only needs the base configuration and doesn't need the actual credentials logic
    ],
} satisfies NextAuthConfig
