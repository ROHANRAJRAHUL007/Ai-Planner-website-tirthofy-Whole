"use client";

import { createGuide } from "@/app/services/guideService";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function NewGuidePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [guide, setGuide] = useState({
    title: "",
    temple: "",
    state: "",
    district: "",
    category: "",
    coverImage: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setGuide({
      ...guide,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!session?.user?.email) {
        throw new Error("Please sign in before creating a guide.");
      }

      if (!guide.title.trim() || !guide.temple.trim() || !guide.description.trim()) {
        throw new Error("Please fill in the title, temple, and guide description.");
      }

      setLoading(true);

      await createGuide({
        ...guide,
        authorId: session.user.authorId || session.user.email,
        authorName: session.user.name || "Anonymous",
        authorEmail: session.user.email,
      });

      alert("Guide Created Successfully!");
      router.push("/create");
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8">Create Guide</h1>

        <div className="space-y-6">
          <input
            name="title"
            placeholder="Guide Title"
            value={guide.title}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
          />

          <input
            name="temple"
            placeholder="Temple Name"
            value={guide.temple}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="state"
              placeholder="State"
              value={guide.state}
              onChange={handleChange}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
            />

            <input
              name="district"
              placeholder="District"
              value={guide.district}
              onChange={handleChange}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <input
            name="category"
            placeholder="Category"
            value={guide.category}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
          />

          <input
            name="coverImage"
            type="url"
            placeholder="Image URL"
            value={guide.coverImage}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
          />

          <textarea
            rows={8}
            name="description"
            placeholder="Guide Description"
            value={guide.description}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
          />

          <div className="flex gap-4">
            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Guide"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
