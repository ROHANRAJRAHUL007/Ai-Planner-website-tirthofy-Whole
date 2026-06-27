"use client";

import { useState } from "react";

export default function Editor() {
  // get title + location from create page
  const [guide] = useState(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("guide");

      return data ? JSON.parse(data) : null;
    }

    return null;
  });

  const [overview, setOverview] = useState("");

  const [places, setPlaces] = useState([]);

  function addPlace() {
    setPlaces([
      ...places,

      {
        title: "",
        description: "",
      },
    ]);
  }

  function updatePlace(index, field, value) {
    const updated = [...places];

    updated[index][field] = value;

    setPlaces(updated);
  }

  async function saveGuide() {
    const finalGuide = {
      title: guide?.title,
      location: guide?.location,
      overview,
      places,
    };

    try {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/guides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalGuide),
      });

      const data = await res.json();

      console.log(data);

      alert("Guide saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save guide");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}

      <div
        className="
        h-80
        bg-neutral-800
        flex
        items-end
        p-10
        "
      >
        <div>
          <h1 className="text-5xl font-bold">
            {guide?.title || "Untitled Guide"}
          </h1>

          <p className="text-gray-400 mt-3">{guide?.location}</p>
        </div>
      </div>

      {/* CONTENT */}

      <div className="max-w-4xl mx-auto py-10 px-5">
        {/* OVERVIEW */}

        <h2 className="text-2xl font-bold">Overview</h2>

        <textarea
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          placeholder="Write overview..."
          className="
          mt-5
          w-full
          h-40
          bg-neutral-900
          rounded-xl
          p-5
          outline-none
          resize-none
          "
        />

        {/* PLACES */}

        <h2 className="text-3xl font-bold mt-12">Places</h2>

        {places.map((place, index) => (
          <div
            key={index}
            className="
              bg-neutral-900
              p-5
              rounded-xl
              mt-5
              space-y-5
              "
          >
            <input
              value={place.title}
              onChange={(e) => updatePlace(index, "title", e.target.value)}
              placeholder="Place title"
              className="
                w-full
                bg-transparent
                outline-none
                text-xl
                "
            />

            <textarea
              value={place.description}
              onChange={(e) =>
                updatePlace(index, "description", e.target.value)
              }
              placeholder="Description..."
              className="
                w-full
                bg-transparent
                outline-none
                resize-none
                "
            />
          </div>
        ))}

        {/* ADD */}

        <button
          onClick={addPlace}
          className="
          mt-8
          bg-white
          text-black
          px-8
          py-3
          rounded-full
          font-bold
          hover:scale-105
          transition
          "
        >
          + Add item
        </button>

        {/* SAVE */}

        <button
          onClick={saveGuide}
          className="
          block
          mt-10
          w-full
          bg-green-500
          py-4
          rounded-full
          font-bold
          text-xl
          "
        >
          Save Guide
        </button>
      </div>
    </div>
  );
}
