"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { sendChat } from "../services/chat_api";

export function useChat() {
  //1. User input from the text box
  //2. Trip data received from the backend
  //3. Controls loading spinner / button state
  //4. Stores API/network error messages

  const [message, setMessage] = useState("");
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  async function handleSend() {
    // Prevent empty messages
    if (!message.trim()) return;
    try {
      /////////////////////////////////////////
      // Start loading and clear old errors
      // Remove old error before sending a new request
      // Send user message to FastAPI backend
      // Save response in state
      // Clear input box after successful request
      setLoading(true);
      setError("");
      const answer = await sendChat(message, session.user.email);
      setTrip(answer);
      setMessage("");
      ////////////////////////////////////////////////
    } catch (error) {
      // Log error for debugging
      // Reset trip data if request fails
      // Show error message in UI
      console.log(error);
      setTrip(null);
      setError("Something went wrong");
    } finally {
      // Stop loading whether success or failure
      setLoading(false);
    }
  }

  // Expose state and functions to components
  return {
    message,
    setMessage,
    trip,
    loading,
    error,
    handleSend,
  };
}
