"use client";

import { useChat } from "../../hooks/useChat";
import ChatInput from "./ChatInput";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import TripResult from "./TripResult";

export default function ChatBox() {
  const { message, setMessage, messages, loading, error, handleSend } =
    useChat();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {messages.map((msg, index) => (
        <div key={index} className="mb-6">
          {msg.role === "user" ? (
            <div className="flex justify-end">
              <div className="bg-orange-500 text-white px-4 py-2 rounded-xl">
                {msg.content}
              </div>
            </div>
          ) : (
            <TripResult trip={msg.trip} />
          )}
        </div>
      ))}

      {loading && <LoadingMessage />}

      {error && <ErrorMessage error={error} />}

      <ChatInput
        message={message}
        setMessage={setMessage}
        loading={loading}
        handleSend={handleSend}
      />
    </div>
  );
}
