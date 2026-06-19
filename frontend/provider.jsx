"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  // Exposes the NextAuth session to all client components under the app root.
  return <SessionProvider>{children}</SessionProvider>;
}
