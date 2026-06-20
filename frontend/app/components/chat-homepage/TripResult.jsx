export default function TripResult({ trip }) {
  if (!trip) {
    return null;
  }

  if (typeof trip === "string") {
    return (
      <section className="mt-6 rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <h2 className="text-xl font-semibold text-white">Your Trip Plan</h2>
        <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-200">
          {trip}
        </p>
      </section>
    );
  }

  const days = trip.days || [];
  const tips = trip.tips || [];

  return (
    <section className="mt-6 space-y-6 rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">
          {trip.title || "Your Trip Plan"}
        </h2>

        {trip.duration ? (
          <p className="text-sm text-zinc-400">{trip.duration}</p>
        ) : null}

        <p className="text-sm text-zinc-300">
          Best Time: {trip.best_time || "Any time"}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-white">Days</h3>

        {days.length === 0 && (
          <p className="text-zinc-400">No itinerary available</p>
        )}

        {days.map((day, index) => {
          const places = day.places || [];

          return (
            <article
              key={index}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            >
              <h4 className="font-medium text-white">
                Day {day.day || index + 1}
              </h4>

              {day.description ? (
                <p className="mt-2 text-zinc-300">{day.description}</p>
              ) : null}

              {places.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {places.map((place, i) => {
                    return (
                      <p key={i} className="text-sm text-zinc-200">
                        - {place}
                      </p>
                    );
                  })}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {tips.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white">Tips</h3>

          <div className="space-y-2">
            {tips.map((tip, index) => {
              return (
                <p key={index} className="text-sm text-zinc-300">
                  - {tip}
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
