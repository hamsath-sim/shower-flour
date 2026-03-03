import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("Authorize called for:", credentials?.email);
                if (!credentials?.email || !credentials?.password) return null

                const normalizedEmail = (credentials.email as string).toLowerCase().trim();
                const user = await prisma.user.findUnique({
                    where: { email: normalizedEmail },
                })

                if (!user || !user.password) {
                    console.log("Auth failed: User not found or no password set for", credentials?.email)
                    return null
                }

                // Check if password match (supports both plain text for migration/dev and hashed)
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                ) || (credentials.password === user.password)

                if (!isPasswordCorrect) {
                    console.log("Auth failed: Password mismatch for", credentials?.email)
                    return null
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                }
            },
        }),
    ],
})

