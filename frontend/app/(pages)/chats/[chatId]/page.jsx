"use client";

import { useParams } from "next/navigation";

export default function ConversationPage() {
  const { chatId } = useParams();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">
        Conversation Page
      </h1>

      <p className="mt-4 text-zinc-400">
        Chat ID: {chatId}
      </p>
    </div>
  );
}
