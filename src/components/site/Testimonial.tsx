"use client";
import { useState } from "react";

const testimonials = [
  {
    text: "“Chhota Rajasthan Patrika always provides authentic, fast, and detailed news. I never miss an update.”",
    name: "Rajesh Kumar, Jaipur",
  },
  {
    text: "“I appreciate their focus on truth and accuracy. The reporting style feels very human and real.”",
    name: "Neha Sharma, Delhi",
  },
  {
    text: "“Great coverage of local and national events. The app layout and website are easy to use.”",
    name: "Imran Sheikh, Mumbai",
  },
];

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="testimonial-area">
      <h2>What Our Readers Say</h2>

      {/* SLIDES */}
      <div className="testimonial-slider">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`testimonial-slide ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <i className="fa-solid fa-quote-left"></i>
            <p>{item.text}</p>
            <h4>- {item.name}</h4>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}
