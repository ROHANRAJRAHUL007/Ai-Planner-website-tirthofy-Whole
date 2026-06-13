"use client";

import { useSession } from "next-auth/react";
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
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold">Your Chats</h1>

      <div className="mt-6 space-y-3">
        {chats.map((chat) => (
          <div key={chat._id} className="bg-zinc-900 rounded-xl p-4">
            <h2 className="font-bold">{chat.title}</h2>

            <p className="text-sm text-zinc-400">
              {chat.messages?.[0]?.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
