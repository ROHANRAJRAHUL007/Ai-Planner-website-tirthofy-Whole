const suggestions = [
  "Peace",
  "Architecture",
  "Weekend Trip",
  "Shiva Temples",
  "Family Pilgrimage",
];

export default function AISection() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-orange-700 to-red-700 rounded-3xl p-10 text-center">
        <h2 className="text-4xl font-bold mb-4">✨ Ask Tirthofy AI</h2>

        <p className="mb-6">Find temples based on your spiritual interests.</p>

        <div className="flex flex-wrap justify-center gap-3">
          {suggestions.map((item) => (
            <button
              key={item}
              className="bg-white text-black px-5 py-2 rounded-full"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
