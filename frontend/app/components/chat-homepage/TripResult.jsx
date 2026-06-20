export default function TripResult({ trip }) {
  if (!trip) {
    return <p>No trip found</p>;
  }

  const days = trip.days || [];
  const tips = trip.tips || [];

  return (
    <div>
      <h1>{trip.title || "Your Trip Plan"}</h1>

      <p>{trip.duration || ""}</p>

      <p>Best Time: {trip.best_time || "Any time"}</p>

      <h2>Days</h2>

      {days.length === 0 && <p>No itinerary available</p>}

      {days.map((day, index) => {
        const places = day.places || [];

        return (
          <div key={index}>
            <h3>Day {day.day || index + 1}</h3>

            <p>{day.description || ""}</p>

            {places.map((place, i) => {
              return <p key={i}>📍 {place}</p>;
            })}
          </div>
        );
      })}

      <h2>Tips</h2>

      {tips.map((tip, index) => {
        return <p key={index}>• {tip}</p>;
      })}
    </div>
  );
}
