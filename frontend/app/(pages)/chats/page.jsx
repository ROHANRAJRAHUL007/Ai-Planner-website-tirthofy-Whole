"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getChats } from "../../services/chatHistory";

export default function ChatsPage() {
  const { data: session } = useSession();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      getChats(session.user.email).then((data) => {
        if (Array.isArray(data)) {
          setChats(data);
        } else {
          setChats([]);
        }
      });
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">Your Chats</h1>

      <div className="mt-6 space-y-3">
        {chats.length === 0 ? (
          <p className="text-zinc-500">No chats found.</p>
        ) : (
          chats.map((chat) => (
            <Link key={chat._id} href={`/chats/${chat._id}`}>
              <div className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition cursor-pointer">
                <h2 className="font-bold">{chat.title || "Untitled Chat"}</h2>

                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                  {chat.messages?.[0]?.content || "No messages yet"}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
