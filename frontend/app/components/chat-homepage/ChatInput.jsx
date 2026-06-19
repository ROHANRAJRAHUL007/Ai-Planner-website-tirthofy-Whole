"use client";

// Import ArrowUp icon from lucide-react
import { ArrowUp } from "lucide-react";

// ChatInput component receives props from parent component
export default function ChatInput({
  message, // Current input value
  setMessage, // Function to update input value
  loading, // Loading state (true while API request is running)
  handleSend, // Function to send the message
}) {
  return (
    // Container for input and button
    <div className="flex items-center gap-2 border rounded-xl p-3">
      {/* User input field */}
      <input
        className="flex-1 outline-none"
        // Take remaining width, remove default outline
        value={message}
        // Controlled input value
        onChange={(e) => setMessage(e.target.value)}
        // Update state on typing
        // Send message when Enter key is pressed
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            handleSend();
          }
        }}
        placeholder="Ask anything..."
        // Disable input while waiting for response
        disabled={loading}
      />

      {/* Send button */}
      <button
        onClick={handleSend} // Call send function when clicked
        // Disable button if:
        // 1. Request is loading OR
        // 2. Input is empty or contains only spaces
        disabled={loading || !message.trim()}
      >
        {/* Up-arrow send icon */}
        <ArrowUp />
      </button>
    </div>
  );
}
