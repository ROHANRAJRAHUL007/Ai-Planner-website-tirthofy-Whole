"use client";

import GuideCard from "./GuideCard";

export default function GuideGrid({ guides, loading }) {
  if (loading) {
    return <p className="text-zinc-400">Loading...</p>;
  }

  if (guides.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Guides Yet</h2>

        <p className="text-zinc-400 mt-3">
          Click <span className="text-orange-500">+ New Guide</span> to create
          your first guide.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <GuideCard key={guide._id} guide={guide} />
      ))}
    </div>
  );
}
