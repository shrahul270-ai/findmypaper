"use client";
import "./Counter.css";
import React, { useEffect, useState, useRef } from "react";


export default function Counter() {
  const counters = [
    { label: "Articles Published", target: 1500 },
    { label: "Daily Visitors", target: 8500 },
    { label: "Active Subscribers", target: 1200 },
    { label: "Journalists & Editors", target: 75 },
  ];

  const [counts, setCounts] = useState(counters.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTime = null;
        const duration = 2000;

        function animate(time) {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);

          setCounts(counters.map((c) => Math.floor(c.target * progress)));

          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        observer.unobserve(section);
      }
    });

    observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  return (
  <section ref={sectionRef} className="counter-section">
    <h2 className="counter-heading">Our Impact in Numbers</h2>

    <div className="counter-container">
      {counters.map((c, i) => (
        <div key={i} className="counter-card">
          <h3 className="counter-number">{counts[i]}</h3>
          <p className="counter-label">{c.label}</p>
        </div>
      ))}
    </div>
  </section>
);
}
