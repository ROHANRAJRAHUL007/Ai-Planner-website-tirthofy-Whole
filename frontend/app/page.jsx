import Sidebar from "./components/sidebar/Sidebar";

import ChatBox from "./components/ChatBox";

export default function Home() {
  return (
    <main className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex gap-10">
          <div className="flex-1">
            <div className="text-center mt-24 mb-12">
              <h1 className="text-5xl font-bold mb-4">Where to today?</h1>
              <p className="text-zinc-400">Ask me anything travel related.</p>
            </div>

            <ChatBox />
          </div>
        </div>
      </div>
    </main>
  );
}
