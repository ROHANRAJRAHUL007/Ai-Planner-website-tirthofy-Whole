"use client";

import { useState } from "react";
import useTemples from "./hook/useTemples";

import HeroSection from "./components/HeroSection";
import QuickFilters from "./components/QuickFilters";
import TempleGrid from "./components/TempleGrid";

export default function ExplorePage() {
  const { temples, loading } = useTemples();

  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  // Generate state list from MongoDB data
  const states = [
    "All",
    ...new Set(temples.map((temple) => temple.state).filter(Boolean)),
  ];

  // Search + State filter
  const filteredTemples = temples.filter((temple) => {
    const matchSearch = temple.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchState =
      selectedState === "All" || temple.state === selectedState;

    return matchSearch && matchState;
  });

  return (
    <main className="bg-black min-h-screen text-white px-6 py-10">
      {/* Hero */}
      <HeroSection search={search} setSearch={setSearch} />

      {/* State Filters */}
      <section className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`px-4 py-2 rounded-full transition ${
                selectedState === state
                  ? "bg-orange-600 text-white"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </section>

      {/* Quick Filters */}
      <QuickFilters />
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="text-3xl font-bold">🛕 Temples</h2>

        <p className="text-gray-400 mt-2">
          Showing {filteredTemples.length} temples
        </p>
      </div>
      {/* Temple Cards */}
      <TempleGrid temples={filteredTemples} loading={loading} />
    </main>
  );
}
