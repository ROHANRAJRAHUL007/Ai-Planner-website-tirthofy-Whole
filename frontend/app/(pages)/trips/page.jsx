const trips = [
  {
    destination: "Tirupati",
    company: "ABC Travels",
    duration: "2 Days",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
    url: "https://mydivinetrip.com/kolkata-tirupati-tour-packages",
  },
  {
    destination: "Kashi",
    company: "Holy Travels",
    duration: "3 Days",
    price: "₹7,500",
    image:
      "https://images.unsplash.com/photo-1706186839147-0d708602587b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaGl8ZW58MHx8MHx8fDA%3D",
    url: "https://saishishirtours.in/tour/kashi-tour-packages-from-bangalore/",
  },
];

export default function TripsPage() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow">
          <img
            src={trip.image}
            alt={trip.destination}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-bold">{trip.destination}</h2>

            <p>Travel Company: {trip.company}</p>
            <p>Duration: {trip.duration}</p>
            <p>Price: {trip.price}</p>

            <a
              href={trip.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Book Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
