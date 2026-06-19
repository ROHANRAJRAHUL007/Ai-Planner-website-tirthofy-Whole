"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { sendChat } from "../services/chat_api";

export function useChat() {
  const [message, setMessage] = useState("");
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();

  async function handleSend() {
    if (!message.trim()) return;

    try {
      setLoading(true);
      setError("");

      // The backend stores chats per signed-in user, so block anonymous sends.
      if (!session) {
        setError("Please login first");
        return;
      }

      // The current backend returns plain text in `answer`, but the UI also
      // supports a structured trip object if that response shape changes later.
      const data = await sendChat(message, session.user.email);

      // backend response -> { answer, chatId }
      setTrip(data.answer);

      setMessage("");
    } catch (error) {
      console.log(error);

      setTrip(null);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    message,
    setMessage,
    trip,
    loading,
    error,
    handleSend,
  };
}
