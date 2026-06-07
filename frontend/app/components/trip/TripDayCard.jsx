import ActivityCard from "./ActivityCard";

export default function TripDayCard({ day }) {
  return (
    <div className="mt-5 border rounded-xl p-5">
      <h2 className="text-xl font-bold">{day.day}</h2>

      <p>{day.title}</p>

      {day.activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} />
      ))}
    </div>
  );
}
