export default function TripResult({ trip }) {
  if (!trip) {
    return <p>No trip found</p>;
  }

  return (
    <div>
      <h1>{trip.title}</h1>

      <p>{trip.duration}</p>

      <p>Best Time: {trip.best_time}</p>

      <h2>Days</h2>

      {trip.days.map((day) => {
        return (
          <div key={day.day}>
            <h3>Day {day.day}</h3>

            <p>{day.description}</p>

            {day.places.map((place) => {
              return <p key={place}>📍 {place}</p>;
            })}
          </div>
        );
      })}

      <h2>Tips</h2>

      {trip.tips.map((tip) => {
        return <p key={tip}>• {tip}</p>;
      })}
    </div>
  );
}
