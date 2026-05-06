"use client";
import React from "react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Newspaper Advertising",
      desc: "Promote your business through targeted newspaper campaigns with maximum local reach.",
      icon: "📰",
    },
    {
      title: "Digital Marketing",
      desc: "SEO, social media marketing, and online branding strategies to grow your business online.",
      icon: "📱",
    },
    {
      title: "Brand Promotion",
      desc: "Complete brand visibility solutions to increase trust and customer engagement.",
      icon: "🚀",
    },
    {
      title: "Content & Media Strategy",
      desc: "Strategic content planning to deliver impactful media presence.",
      icon: "🎯",
    },
  ];

  return (
    <section style={{ fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          color: "#fff",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Our Services
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
          At <strong>BalajiPrimeMedia</strong>, we help businesses grow with powerful
          media exposure and strategic marketing solutions.
        </p>
      </div>

      {/* Services Grid */}
      <div
        style={{
          padding: "4rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              padding: "2rem",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
              textAlign: "center",
              background: "#fff",
              transition: "0.3s",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              {service.icon}
            </div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.3rem" }}>
              {service.title}
            </h3>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div
        style={{
          background: "#f8fafc",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
          Why Choose BalajiPrimeMedia?
        </h2>

        <p style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", color: "#555" }}>
          We combine traditional newspaper advertising with modern digital strategies
          to deliver measurable results. Our mission is to help businesses expand
          their reach, build brand authority, and generate more leads.
        </p>
      </div>

      {/* Our Process */}
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
          Our Process
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div>
            <h3>1️⃣ Consultation</h3>
            <p>We understand your business goals and target audience.</p>
          </div>

          <div>
            <h3>2️⃣ Strategy Planning</h3>
            <p>We design a customized media and marketing strategy.</p>
          </div>

          <div>
            <h3>3️⃣ Execution</h3>
            <p>Campaign launch across newspaper & digital platforms.</p>
          </div>

          <div>
            <h3>4️⃣ Growth & Results</h3>
            <p>We track performance and optimize for better ROI.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          📞 Ready to Grow Your Business?
        </h2>

        <p style={{ marginBottom: "2rem" }}>
          Book a demo today and discover how BalajiPrimeMedia can boost your brand visibility.
        </p>

        <Link href="/contact">
          <button
            style={{
              padding: "14px 30px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              background: "#fff",
              color: "#764ba2",
            }}
          >
            Book a Demo
          </button>
        </Link>
      </div>
    </section>
  );
}
