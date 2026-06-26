import Link from "next/link";
export default function TempleCard({ temple }) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-orange-700 to-red-900 flex items-center justify-center">
        <span className="text-6xl">🛕</span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{temple.name}</h3>

        <p className="text-gray-400 text-sm">📍 {temple.state || "India"}</p>

        <p className="mt-3 text-sm text-gray-300 line-clamp-3">
          {temple.description ||
            "Ancient sacred temple with rich spiritual heritage."}
        </p>

        <Link
          href={`/explore/${encodeURIComponent(
            temple.name.toLowerCase().replace(/\s+/g, "-"),
          )}`}
          className="block mt-4 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-center"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}
