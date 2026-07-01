export default function GuideCard({ guide }) {
  const imageSrc = (guide.coverImage || "").trim() || "/default-temple.jpg";

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition">
      <img
        src={imageSrc}
        alt={guide.title}
        className="w-full h-48 object-cover"
        onError={(event) => {
          event.currentTarget.src = "/default-temple.jpg";
        }}
      />

      <div className="p-5">
        <div className="flex justify-between items-center">
          <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full">
            {guide.status || "Draft"}
          </span>

          <button type="button">?</button>
        </div>

        <h2 className="text-xl font-semibold mt-4">{guide.title}</h2>

        <p className="text-zinc-400 mt-2">{guide.temple}</p>
      </div>
    </div>
  );
}
