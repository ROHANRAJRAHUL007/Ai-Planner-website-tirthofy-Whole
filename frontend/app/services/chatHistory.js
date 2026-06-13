import { API_BASE_URL } from "../config/config";


export async function getChats(email) {


  const res = await fetch(
    `${API_BASE_URL}/chats/${encodeURIComponent(email)}`
  );


  if (!res.ok) {

    console.log(
      await res.text()
    );

    return [];

  }


  return await res.json();

}
