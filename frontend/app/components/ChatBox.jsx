"use client";

import { ArrowUp } from "lucide-react";
import { useChat } from "../hooks/useChat";

export default function ChatBox() {
  const { message, setMessage, trip, loading, error, handleSend } = useChat();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* INPUT */}
      <div className="flex items-center gap-2 border rounded-xl p-3">
        <input
          className="flex-1 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSend();
            }
          }}
          placeholder="Ask anything..."
          disabled={loading}
        />

        <button onClick={handleSend} disabled={loading || !message.trim()}>
          <ArrowUp />
        </button>
      </div>

      {loading && <p className="mt-4 text-zinc-400">Planning your trip...</p>}

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* RESULT */}
      {trip && (
        <div className="mt-6 border rounded-xl p-5 space-y-4">
          {typeof trip === "string" ? (
            <p className="whitespace-pre-wrap">{trip}</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{trip.title}</h1>

              <p>{trip.duration}</p>

              {trip.best_time && <p>Best Time: {trip.best_time}</p>}

              {(trip.days ?? []).map((day, i) => (
                <div key={i} className="border rounded-lg p-3">
                  <h2 className="font-bold">Day {day.day}</h2>

                  <p>{day.description}</p>

                  {(day.places ?? []).map((place, j) => (
                    <div key={j}>📍 {place}</div>
                  ))}
                </div>
              ))}

              {trip.tips && (
                <div>
                  <h2 className="font-bold">Tips</h2>

                  {(trip.tips ?? []).map((tip, i) => (
                    <p key={i}>• {tip}</p>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
