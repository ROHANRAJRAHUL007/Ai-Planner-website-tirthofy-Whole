"use client";

import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

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
            onClick={() => signIn("google")}
            className="
              w-full mt-3
              bg-white text-black
              rounded-xl p-3
              flex items-center justify-center gap-2
            "
          >
            <FcGoogle size={20} />
            {open && "Continue with Google"}
          </button>
        </>
      )}
    </div>
  );
}
