"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendChat } from "../services/chat_api";

function normalizeMessages(messages = []) {
  return messages.map((message) => {
    if (message.role === "assistant") {
      return {
        role: "assistant",
        content: message.content,
        trip: message.trip ?? message.content,
      };
    }

    return {
      role: "user",
      content: message.content,
    };
  });
}

function isLocalChatId(value) {
  return typeof value === "string" && value.startsWith("local-");
}

function saveLocalChat(chat) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(`chat:${chat._id}`, JSON.stringify(chat));
  } catch (error) {
    console.log(error);
  }
}

function removeLocalChat(chatId) {
  if (typeof window === "undefined" || !chatId) {
    return;
  }

  try {
    window.sessionStorage.removeItem(`chat:${chatId}`);
  } catch (error) {
    console.log(error);
  }
}

export function useChat({
  initialMessages = [],
  initialChatId = "",
  redirectOnFirstReply = false,
} = {}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => normalizeMessages(initialMessages));
  const [chatId, setChatId] = useState(initialChatId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  async function handleSend() {
    const question = message.trim();
    const activeChatId = isLocalChatId(chatId) ? "" : chatId;

    if (!question) {
      return;
    }

    if (!session?.user?.email) {
      setError("Please login first");
      return;
    }

    try {
      setLoading(true);
      setError("");

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: question,
        },
      ]);

      setMessage("");

      const data = await sendChat(question, session.user.email, activeChatId);
      const nextChatId =
        data.chatId ||
        chatId ||
        (redirectOnFirstReply ? `local-${Date.now()}` : "");

      if (nextChatId && nextChatId !== chatId) {
        setChatId(nextChatId);
      }

      if (redirectOnFirstReply && !chatId && nextChatId) {
        saveLocalChat({
          _id: nextChatId,
          title: question.slice(0, 50),
          messages: [
            {
              role: "user",
              content: question,
            },
            {
              role: "assistant",
              content: data.answer,
            },
          ],
        });

        router.push(`/chats/${nextChatId}`);
        return;
      }

      if (chatId && isLocalChatId(chatId)) {
        saveLocalChat({
          _id: chatId,
          title: initialMessages[0]?.content || question.slice(0, 50),
          messages: [
            ...messages.map((item) => ({
              role: item.role,
              content: item.content ?? item.trip,
            })),
            {
              role: "user",
              content: question,
            },
            {
              role: "assistant",
              content: data.answer,
            },
          ],
        });

        if (data.chatId && data.chatId !== chatId) {
          removeLocalChat(chatId);
          setChatId(data.chatId);
          router.replace(`/chats/${data.chatId}`);
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
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
    chatId,
    handleSend,
  };
}
