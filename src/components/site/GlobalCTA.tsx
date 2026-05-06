"use client";

import { useState } from "react";

export default function GlobalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      {/* 🌍 GLOBAL IMPACT SECTION */}
      <section className="cta-section global-impact">
        <h2>🌍 Our Global Reach</h2>
        <p>Delivering trusted news to readers across 50+ countries, 24/7.</p>

        <div className="impact-stats">
          <div>
            <h3>50+</h3>
            <p>Countries Reached</p>
          </div>
          <div>
            <h3>1M+</h3>
            <p>Daily Readers</p>
          </div>
          <div>
            <h3>10K+</h3>
            <p>Published Stories</p>
          </div>
        </div>
      </section>

     
        
    </>
  );
}
