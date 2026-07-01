import { API_BASE_URL } from "../config/config";

export async function sendChat(message, email, chatId) {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      email,
      chatId,
    }),
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}
