import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";




const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: user.name,
            email: user.email,
          }),
        });

        console.log("FASTAPI STATUS:", res.status);
      } catch (error) {
        console.log("FASTAPI ERROR:", error);
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
