import TempleCard from "./TempleCard";

export default function TempleGrid({ temples, loading }) {
  return (
    <section className="max-w-7xl mx-auto mb-20">
      <h2 className="text-3xl font-bold mb-2">⭐ Featured Temples</h2>

      <p className="text-gray-400 mb-6">{temples.length} temples discovered</p>

      {loading ? (
        <div className="text-center py-10">Loading temples...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {temples.map((temple) => (
            <TempleCard key={temple.name} temple={temple} />
          ))}
        </div>
      )}
    </section>
  );
}
