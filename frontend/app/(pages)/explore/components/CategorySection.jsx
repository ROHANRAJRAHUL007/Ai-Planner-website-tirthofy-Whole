const categories = [
  "12 Jyotirlingas",
  "51 Shakti Peethas",
  "Char Dham",
  "Divya Desams",
  "Ancient Temples",
  "Hill Temples",
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto mb-16">
      <h2 className="text-3xl font-bold mb-6">🏛 Explore by Category</h2>

      <div className="grid md:grid-cols-3 gap-5">
        {categories.map((item) => (
          <div
            key={item}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-orange-500 cursor-pointer"
          >
            <h3 className="font-semibold text-lg">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
