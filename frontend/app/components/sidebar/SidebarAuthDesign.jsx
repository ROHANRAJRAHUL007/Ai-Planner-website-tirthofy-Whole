"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SidebarAuthDesign({ open }) {
  const { data: session } = useSession();

  return (
    <div className="mt-10 border-t border-zinc-800 pt-5">
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="
            w-full bg-white text-black
            rounded-xl p-3
          "
        >
          {open ? "Sign in with Google" : "G"}
        </button>
      ) : (
        <>
          {open && (
            <>
              <p className="font-semibold">{session.user?.name}</p>

              <p className="text-sm text-zinc-400">{session.user?.email}</p>
            </>
          )}

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="
              w-full mt-3
              bg-zinc-900 text-white
              rounded-xl p-3
              flex items-center justify-center gap-2
              hover:bg-zinc-800 transition-colors
            "
          >
            <LogOut size={18} />
            {open && "Logout"}
          </button>
        </>
      )}
    </div>
  );
}
