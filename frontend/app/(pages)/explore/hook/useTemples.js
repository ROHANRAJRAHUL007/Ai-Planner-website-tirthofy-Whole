"use client";

import { useEffect, useState } from "react";

export default function useTemples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/temples")
      .then((res) => res.json())
      .then((data) => {
        setTemples(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const states = [
    "All",
    ...new Set(temples.map((temple) => temple.state).filter(Boolean)),
  ];
  return { temples, loading };
}
