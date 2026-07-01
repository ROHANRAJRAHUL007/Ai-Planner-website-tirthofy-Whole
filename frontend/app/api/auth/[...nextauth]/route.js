import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOCAL_API = "http://127.0.0.1:8000";
const REMOTE_API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

function buildBackendCandidates() {
  const nextAuthUrl = (process.env.NEXTAUTH_URL || "").toLowerCase();
  const isLocalAuth =
    nextAuthUrl.includes("localhost") ||
    nextAuthUrl.includes("127.0.0.1") ||
    process.env.NODE_ENV !== "production";

  const preferred = isLocalAuth ? [LOCAL_API, REMOTE_API] : [REMOTE_API, LOCAL_API];
  return [...new Set(preferred.filter(Boolean))];
}

async function syncUserToBackend(user) {
  const candidates = buildBackendCandidates();

  for (let index = 0; index < candidates.length; index += 1) {
    const baseUrl = candidates[index];

    try {
      const res = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      });

      if (!res.ok) {
        continue;
      }

      return await res.json();
    } catch (error) {
      if (index === candidates.length - 1) {
        throw error;
      }
    }
  }

  return null;
}

export const authOptions = {
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
        const backendUser = await syncUserToBackend(user);
        user.authorId = backendUser?.id || user.email;
      } catch (error) {
        console.error("NextAuth backend user sync failed:", error);
        user.authorId = user.email;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.authorId = user.authorId || user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.authorId = token.authorId || session.user.email;
      }

      return session;
    },
  },
};

const nextAuthHandler = NextAuth(authOptions);

export async function GET(request, context) {
  return nextAuthHandler(request, context);
}

export async function POST(request, context) {
  return nextAuthHandler(request, context);
}
