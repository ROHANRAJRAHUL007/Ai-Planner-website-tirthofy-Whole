"use client";

import { useEffect, useState } from "react";

export default function InspirationPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuides() {
      try {
        const res = await fetch("http://127.0.0.1:8000/guides");

        const data = await res.json();

        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGuides();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">Featured guides</h1>

        <p className="mt-8 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">Featured guides</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">No guides available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition"
            >
              <img
                src={
                  post.coverImage ||
                  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900"
                }
                alt={post.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">
                <div className="inline-block bg-black text-white text-sm px-3 py-1 rounded-full mb-4">
                  {post.places?.length || 0} places
                </div>

                <h2 className="text-2xl font-bold text-black">{post.title}</h2>

                <p className="text-gray-900 mt-2">📍 {post.location}</p>

                <p className="text-gray-900 mt-4 line-clamp-3">
                  {post.overview}
                </p>

                <p className="mt-5 text-sm text-gray-500">by Anonymous</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
