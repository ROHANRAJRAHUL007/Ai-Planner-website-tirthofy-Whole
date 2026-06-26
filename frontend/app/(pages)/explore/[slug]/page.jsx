"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TempleDetailPage() {
  const { slug } = useParams();

  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const templeName = decodeURIComponent(slug).replace(/-/g, " ");

    fetch(`http://127.0.0.1:8000/temples/${encodeURIComponent(templeName)}`)
      .then((res) => res.json())
      .then((data) => {
        setTemple(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white text-xl">
        Loading Temple...
      </div>
    );
  }

  if (!temple || temple.error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-500 text-xl">
        Temple not found
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white">
      <div className="h-96 bg-gradient-to-r from-orange-700 to-red-900 flex items-center justify-center">
        <span className="text-9xl">🛕</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold">{temple.name}</h1>

        <p className="text-gray-400 text-xl mt-3">
          📍 {temple.state}, {temple.country}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="font-bold mb-3">Category</h3>
            <p>{temple.category}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="font-bold mb-3">State</h3>
            <p>{temple.state}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="font-bold mb-3">Country</h3>
            <p>{temple.country}</p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-8 mt-10">
          <h2 className="text-3xl font-bold mb-5">About Temple</h2>

          <p className="text-gray-300 leading-8">{temple.description}</p>
        </div>
      </div>
    </main>
  );
}
