export default function InspirationPage() {
  const posts = [
    {
      id: 1,
      title: "Kedarnath Yatra Guide",
      location: "Uttarakhand",
      author: "Rahul",
      image:
        "https://images.unsplash.com/photo-1712733900711-d0b929d0d7cc?w=600",
    },
    {
      id: 2,
      title: "Tirupati Balaji Darshan",
      location: "Andhra Pradesh",
      author: "Rohan",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Inspiration</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">{post.title}</h2>

              <p className="text-gray-500">📍 {post.location}</p>

              <p className="mt-2 text-sm">by {post.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
