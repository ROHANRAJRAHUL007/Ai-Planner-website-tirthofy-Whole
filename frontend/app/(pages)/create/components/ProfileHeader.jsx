"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileHeader() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-8">
      <div className="flex items-center gap-5">
        <Image
          src={session?.user?.image || "/avatar.png"}
          alt=""
          width={80}
          height={80}
          className="rounded-full"
        />

        <div>
          <h1 className="text-3xl font-bold">{session?.user?.name}</h1>

          <p className="text-zinc-400 mt-1">Creator on Tirthofy</p>

          <button className="mt-4 border border-zinc-700 rounded-lg px-4 py-2 hover:bg-zinc-800">
            View Profile
          </button>
        </div>
      </div>

      <Link
        href="/create/new"
        className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-medium"
      >
        + New Guide
      </Link>
    </div>
  );
}
