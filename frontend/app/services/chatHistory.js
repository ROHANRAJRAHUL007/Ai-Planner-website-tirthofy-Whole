import { API_BASE_URL } from "../config/config";

export async function getChats(email) {
  const res = await fetch(
    `${API_BASE_URL}/chats/user/${encodeURIComponent(email)}`
  );

  if (!res.ok) {
    console.log(await res.text());
    return [];
  }

  return await res.json();
}

export async function getChatById(chatId) {
  const res = await fetch(`${API_BASE_URL}/chats/${encodeURIComponent(chatId)}`);

  if (!res.ok) {
    throw new Error("Unable to fetch chat");
  }

  return await res.json();
}
