import CredentialProviders from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const NEXT_AUTH = {
    providers: [
        CredentialProviders({
            name: "Email",
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'username' },
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials: any) {
                // Here, id cannot be sent . if you want to share the id use callback
                console.log("credentials are ", credentials, "credentials");
                try {
                    // const password = await bcrypt.hash(credentials.password, 10);

                    const userExist = await prisma.user.findFirst({
                        where: {
                            username: credentials.username
                        },
                        select: {
                            hashedPswd: true,
                            email: true
                        }
                    })
                    if (userExist) {
                        const validPass = await bcrypt.compare(credentials.password, userExist.hashedPswd)
                        if (validPass && userExist.email == credentials.email) {
                            return {
                                id: credentials.userId,
                                name: credentials.username,
                                email: credentials.email
                            }
                        }
                    }
                    return null
                }
                catch (error) {
                    console.error(error);

                }
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // While logging in, if you wnat to intercept any function we can do this using the following callbacks
    callbacks: {
        // If you want to return the fields other than a subset of the token, use session callback

        session: ({ session, token }: any) => {
            console.log(session);
            if (session && session.user) {
                session.user.id = token.sub
            }
            return session
        }
        // jwt: ({ token, user }) => {
        //     console.log(token);

        //     return token;
        // },

    },
    pages: {
        signIn: "/signin"
    }
}