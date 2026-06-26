const filters = [
  "Shiva",
  "Vishnu",
  "Shakti",
  "Jyotirlinga",
  "Char Dham",
  "South India",
];

export default function QuickFilters() {
  return (
    <section className="max-w-7xl mx-auto mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {filters.map((item) => (
          <button
            key={item}
            className="bg-zinc-900 hover:bg-orange-600 transition px-5 py-2 rounded-full"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
