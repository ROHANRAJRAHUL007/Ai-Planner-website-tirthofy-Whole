"use client";

import TripCard from "@/app/components/trip/TripCard";
import { ArrowUp } from "lucide-react";
import { useChat } from "../hooks/useChat";

export default function ChatBox() {
  const { message, setMessage, trip, loading, error, handleSend } = useChat();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="
        flex items-center gap-2
        border rounded-xl p-3
      "
      >
        <input
          className="flex-1 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSend();
            }
          }}
          placeholder="Ask anything..."
          disabled={loading}
        />

        <button onClick={handleSend} disabled={loading || !message.trim()}>
          <ArrowUp />
        </button>
      </div>

      {loading && (
        <div className="mt-4 text-zinc-400">Planning your trip...</div>
      )}

      {error && <div className="mt-4 text-red-400">{error}</div>}

      {trip && (
        <div className="mt-6">
          <TripCard trip={trip} />
        </div>
      )}
    </div>
  );
}
