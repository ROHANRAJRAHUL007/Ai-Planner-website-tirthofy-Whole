export default function TipsCard({ tips }) {
  if (!tips?.length) return null;

  return (
    <div className="mt-5 border rounded-xl p-5">
      <h2 className="font-bold">Tips</h2>
      {tips.map((tip, index) => (
        <p key={index}>- {tip}</p>
      ))}
    </div>
  );
}
