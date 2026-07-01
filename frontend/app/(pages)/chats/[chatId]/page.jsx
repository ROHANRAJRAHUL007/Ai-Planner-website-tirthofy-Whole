"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ChatBox from "@/app/components/chat-homepage/ChatBox";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { getChatById } from "@/app/services/chatHistory";

function getLocalChat(chatId) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.sessionStorage.getItem(`chat:${chatId}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function ConversationPage() {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadChat() {
      try {
        setLoading(true);
        setError("");

        const data = await getChatById(chatId);

        if (!cancelled) {
          setChat(data);
        }
      } catch (loadError) {
        console.log(loadError);

        const localChat = getLocalChat(chatId);

        if (!cancelled && localChat) {
          setChat(localChat);
          setError("");
        } else if (!cancelled) {
          setError("Unable to load this chat.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (chatId) {
      loadChat();
    }

    return () => {
      cancelled = true;
    };
  }, [chatId]);

  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <section className="flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Chat
            </p>

            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              {chat?.title || "Conversation"}
            </h1>
          </div>

          {loading ? <p className="text-zinc-400">Loading conversation...</p> : null}
          {error ? <p className="text-red-400">{error}</p> : null}

          {!loading && !error && chat ? (
            <ChatBox
              key={chat._id}
              initialMessages={chat.messages || []}
              initialChatId={chat._id}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}
