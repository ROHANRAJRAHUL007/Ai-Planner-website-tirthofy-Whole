"use client";

import { useChat } from "../../hooks/useChat";
import ChatInput from "./ChatInput";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import TripResult from "./TripResult";

export default function ChatBox() {
  const {
    message, // current input value
    setMessage, // update input value
    trip, // trip response from API
    loading, // true while fetching data
    error, // error message if request fails
    handleSend, // function to send request
  } = useChat();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <ChatInput
        message={message}
        setMessage={setMessage}
        loading={loading}
        handleSend={handleSend}
      />
      {/* Show loading text while waiting for response */}
      {loading && <LoadingMessage />}
      {/* Show error if request fails */}
      {error && <ErrorMessage error={error} />}
      {/* Show trip result after successful response */}
      <TripResult trip={trip} />
    </div>
  );
}
