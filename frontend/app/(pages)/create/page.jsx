"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const images = [
    "/travel1.avif",
    "/travel2.avif",
    "/travel3.avif",
    "/travel4.avif",
    "/travel5.avif",
    "/travel6.avif",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* TOP BAR */}

      <div className="flex justify-between items-center px-10 py-5 border-b border-white/10">
        <h1 className="font-bold text-xl">Creator Hub</h1>

        <button
          onClick={() => router.push("/create/blog")}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          Create guide
        </button>
      </div>

      {/* HERO */}

      <section className="h-[430px] flex flex-col justify-center items-center">
        {/* blinking plus */}

        <button
          onClick={() => router.push("/create/blog")}
          className="
          w-24 h-24
          rounded-full
          text-4xl
          bg-gradient-to-br
          from-pink-500
          to-orange-400
          flex items-center justify-center
          animate-pulse
          shadow-lg
          shadow-pink-500/50
          hover:scale-110
          transition
          "
        >
          +
        </button>

        <h2 className="text-4xl font-bold mt-10">Create beautiful guides.</h2>

        <p className="text-gray-400 mt-3 text-lg">
          Share your local expertise with others.
        </p>

        <button
          onClick={() => router.push("/create/blog")}
          className="
          mt-10
          bg-white
          text-black
          px-12
          py-4
          rounded-full
          font-bold
          hover:scale-105
          transition
          "
        >
          Create guide
        </button>
      </section>

      {/* MOVING PHOTOS */}

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-8 animate-scroll">
          {[...images, ...images].map((img, index) => (
            <div
              key={index}
              className="
              min-w-[350px]
              h-[230px]
              rounded-3xl
              overflow-hidden
              "
            >
              <Image
                src={img}
                alt="travel"
                width={500}
                height={300}
                className="
                w-full
                h-full
                object-cover
                hover:scale-110
                transition
                duration-700
                "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
