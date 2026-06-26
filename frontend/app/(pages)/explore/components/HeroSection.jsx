export default function HeroSection({
  search,
  setSearch,
}) {
  return (
    <section className="max-w-7xl mx-auto text-center mb-12">
      <h1 className="text-5xl font-bold mb-4">
        Explore Sacred Temples of India
      </h1>

      <p className="text-gray-400 max-w-2xl mx-auto">
        Discover temple history, darshan timings,
        pilgrimage routes, festivals, architecture,
        and spiritual travel guides.
      </p>

      <div className="mt-8 flex justify-center">
        <input
          type="text"
          placeholder="Search temples..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 outline-none focus:border-orange-500"
        />
      </div>
    </section>
  );
}
