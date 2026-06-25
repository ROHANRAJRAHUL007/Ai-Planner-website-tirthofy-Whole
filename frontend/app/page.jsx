import Image from "next/image";
import ChatBox from "./components/chat-homepage/ChatBox";
import Sidebar from "./components/sidebar/Sidebar";

export default function Home() {
  return (
    <main className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex gap-10">
          <div className="flex-1">
            {/* Banner + Heading */}
            <div className="text-center mt-8 mb-10">
              <Image
                src="/banner.png"
                alt="Sacred Temples of India"
                width={300}
                height={150}
                priority
                className="mx-auto rounded-2xl mb-6"
              />

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explore Sacred Temples of India
              </h1>

              <p className="text-zinc-400 max-w-3xl mx-auto">
                Discover temple history, darshan timings, pilgrimage routes,
                festivals, architecture, and spiritual travel guides.
              </p>
            </div>

            {/* Chat Box */}
            <ChatBox />
          </div>
        </div>
      </div>
    </main>
  );
}
