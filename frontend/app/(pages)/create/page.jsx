"use client";

import { getGuides, getMyGuides } from "@/app/services/guideService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import GuideTabs from "./components/GuideTabs";
import GuideGrid from "./components/Guidgrid";
import ProfileHeader from "./components/ProfileHeader";
import SearchBar from "./components/SearchBar";

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

function collectOwnerKeys(session) {
  return [...new Set([
    normalizeValue(session?.user?.email),
    normalizeValue(session?.user?.authorId),
  ].filter(Boolean))];
}

function mergeUniqueGuides(...guideLists) {
  const seen = new Set();
  const merged = [];

  guideLists.flat().forEach((guide) => {
    const key = guide?._id || `${guide?.title}-${guide?.createdAt}`;

    if (!key || seen.has(key)) {
      return;
    }

    seen.add(key);
    merged.push(guide);
  });

  return merged;
}

function sortByUpdatedAt(guides) {
  return [...guides].sort((a, b) => {
    const aTime = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
    const bTime = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
    return bTime - aTime;
  });
}

export default function CreatePage() {
  const { data: session, status } = useSession();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      if (status === "loading") {
        return;
      }

      const ownerKeys = collectOwnerKeys(session);

      if (ownerKeys.length === 0) {
        setGuides([]);
        setLoading(false);
        return;
      }

      try {
        const ownGuideResponses = await Promise.all(ownerKeys.map((key) => getMyGuides(key)));
        const ownGuides = ownGuideResponses.flatMap((response) =>
          Array.isArray(response) ? response : response.guides || []
        );

        const allGuides = await getGuides();
        const fallbackMatches = allGuides.filter((guide) => {
          const guideOwnerKeys = [
            normalizeValue(guide?.authorId),
            normalizeValue(guide?.authorEmail),
            ...((Array.isArray(guide?.ownerKeys) ? guide.ownerKeys : []).map(normalizeValue)),
          ].filter(Boolean);

          return ownerKeys.some((ownerKey) => guideOwnerKeys.includes(ownerKey));
        });

        setGuides(sortByUpdatedAt(mergeUniqueGuides(ownGuides, fallbackMatches)));
      } catch (error) {
        console.error(error);
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [session?.user?.authorId, session?.user?.email, status]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ProfileHeader />

        <div className="mt-10">
          <GuideTabs />
        </div>

        <div className="mt-6">
          <SearchBar />
        </div>

        <div className="mt-8">
          <GuideGrid guides={guides} loading={loading} />
        </div>
      </div>
    </main>
  );
}
