import NextAuth, { NextAuthOptions, JWT } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID ?? "",
      clientSecret: process.env.KEYCLOAK_SECRET ?? "",
      issuer: process.env.KEYCLOAK_ISSUER,
    })
    //..add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // If account is available, it's the first sign-in
      if (account) {
        token.accessToken = account.access_token; // Store the original access_token
        token.idToken = account.id_token; // Optionally store the id_token
      }
      return token;
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const jwtoken = token as JWT;
      session.accessToken = jwtoken.accessToken
      session.user.id = jwtoken.id

      return session
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };