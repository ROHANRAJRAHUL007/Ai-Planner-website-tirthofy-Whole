import TipsCard from "./TipsCard";
import TripDayCard from "./TripDayCard";

export default function TripCard({ trip }) {
  const { title, duration, best_time, days, tips } = trip;

  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p>{duration}</p>
      {best_time && <p>Best time: {best_time}</p>}
      {days.map((day, index) => (
        <TripDayCard key={index} day={day} />
      ))}

      <TipsCard tips={tips} />
    </div>
  );
}
