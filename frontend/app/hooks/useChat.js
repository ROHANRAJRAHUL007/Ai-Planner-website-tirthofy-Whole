"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { sendChat } from "../services/chat_api";

export function useChat() {
  // Input value
  const [message, setMessage] = useState("");

  // Conversation history
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();

  async function handleSend() {
    if (!message.trim()) return;

    const question = message;

    try {
      setLoading(true);
      setError("");

      if (!session) {
        setError("Please login first");
        return;
      }

      // Show user message
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: question,
        },
      ]);

      setMessage("");

      const data = await sendChat(question, session.user.email);

      // Show AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          trip: data.answer,
        },
      ]);
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    message,
    setMessage,
    messages,
    loading,
    error,
    handleSend,
  };
}
