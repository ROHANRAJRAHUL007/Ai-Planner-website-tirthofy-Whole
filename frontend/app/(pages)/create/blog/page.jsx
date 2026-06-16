"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBlog() {
  const router = useRouter();

  const [guide, setGuide] = useState({
    title: "",
    location: "",
  });

  function handleSubmit() {
    if (!guide.title || !guide.location) {
      alert("Please fill all fields");
      return;
    }

    // temporary save before editor page
    localStorage.setItem("guide", JSON.stringify(guide));

    // go editor
    router.push("/create/blog/editor");
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto pt-32 px-5">
        {/* HEADER */}

        <h1 className="text-5xl font-bold text-center">Configure your guide</h1>

        <p className="text-center mt-5 text-gray-600 text-lg">
          Choose a title and location for your guide.
        </p>

        {/* FORM */}

        <div className="mt-16 space-y-10">
          {/* TITLE */}

          <div>
            <label className="font-bold text-lg">Title</label>

            <input
              value={guide.title}
              onChange={(e) =>
                setGuide({
                  ...guide,

                  title: e.target.value,
                })
              }
              placeholder="Choose your title"
              className="
              mt-3
              w-full
              border
              border-gray-400
              rounded-full
              px-8
              py-5
              text-xl
              outline-none
              focus:border-black
              "
            />
          </div>

          {/* LOCATION */}

          <div>
            <label className="font-bold text-lg">Location</label>

            <input
              value={guide.location}
              onChange={(e) =>
                setGuide({
                  ...guide,

                  location: e.target.value,
                })
              }
              placeholder="Choose your location"
              className="
              mt-3
              w-full
              border
              border-gray-400
              rounded-full
              px-8
              py-5
              text-xl
              outline-none
              focus:border-black
              "
            />
          </div>

          {/* CONTINUE */}

          <button
            onClick={handleSubmit}
            className="
            w-full
            bg-black
            text-white
            rounded-full
            py-5
            text-xl
            font-bold
            hover:scale-105
            transition
            "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
