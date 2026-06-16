export default function ExplorePage() {
  const temples = [
    {
      id: 1,
      name: "Tirupati Balaji Temple",
      location: "Andhra Pradesh",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
      description: "One of India's most famous temples.",
      wiki: "https://en.wikipedia.org/wiki/Venkateswara_Temple,_Tirumala",
      map: "https://maps.google.com/?q=Tirupati+Balaji+Temple",
    },
    {
      id: 2,
      name: "Kedarnath Temple",
      location: "Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1712733900711-d0b929d0d7cc?w=600&auto=format&fit=crop&q=60",
      description: "A sacred temple dedicated to Lord Shiva.",
      wiki: "https://en.wikipedia.org/wiki/Kedarnath_Temple",
      map: "https://maps.google.com/?q=Kedarnath+Temple",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Temples</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {temples.map((temple) => (
          <div
            key={temple.id}
            className="border rounded-xl overflow-hidden shadow-md bg-white"
          >
            <img
              src={temple.image}
              alt={temple.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-500">{temple.name}</h2>

              <p className="text-gray-500">📍 {temple.location}</p>

              <p className="mt-2 text-sm text-gray-700">{temple.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <a
                  href={temple.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-gray-600 rounded-md text-sm"
                >
                  Wikipedia
                </a>

                <a
                  href={temple.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-green-500 text-white rounded-md text-sm"
                >
                  Map
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
