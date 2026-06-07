export default function ActivityCard({ activity }) {
  return (
    <div className="mt-3">
      <p>{activity.time}</p>
      <h3 className="font-bold">{activity.place}</h3>
      <p>{activity.description}</p>
    </div>
  );
}
