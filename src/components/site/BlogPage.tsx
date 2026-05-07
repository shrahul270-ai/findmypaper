"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const categories = ["Technology", "Business", "Entertainment", "Health", "Travel"];

  const blogs = [
    {
      id: 1,
      title: "The Future of AI",
      subTitle: "Exploring innovations in Artificial Intelligence",
      content: "This is the full blog content about AI...",
      image: "/image/6.jpg",
      category: "Technology",
    },
    {
      id: 2,
      title: "Startup Success Tips",
      subTitle: "How to grow your business effectively",
      content: "This is the full blog content about Startup Success...",
      image: "/image/2.jpg",
      category: "Business",
    },
    {
      id: 3,
      title: "Movie Trends 2026",
      subTitle: "What's hot in the entertainment world",
      content: "This is the full blog content about Movie Trends...",
      image: "/image/7.jpg",
      category: "Entertainment",
    },
    {
      id: 4,
      title: "Healthy Living Hacks",
      subTitle: "Tips for a balanced lifestyle",
      content: "This is the full blog content about Healthy Living...",
      image: "/image/8.jpg",
      category: "Health",
    },
    {
      id: 5,
      title: "Top Travel Destinations",
      subTitle: "Explore the world's most beautiful places",
      content: "This is the full blog content about Travel Destinations...",
      image: "/image/9.jpg",
      category: "Travel",
    },
    {
      id: 6,
      title: "Tech Gadgets 2026",
      subTitle: "Newest gadgets you must try",
      content: "This is the full blog content about Tech Gadgets...",
      image: "/image/10.jpg",
      category: "Technology",
    },
  ];

  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedCategory === "" || blog.category === selectedCategory) &&
      (blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
        blog.subTitle.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
📢 New Blog Inquiry

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
📝 Message: ${formData.message}
    `;

    const whatsappURL = `https://wa.me/9694953370?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  // 🔥 Scroll Animate Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: "2rem", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header
        className="scroll-animate"
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          background: "linear-gradient(90deg, #1f1c2c, #3a0ca3, #240b36)",
          color: "#fff",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>Our Blog</h1>
        <p style={{ fontSize: "1.2rem", fontStyle: "italic" }}>Explore stories, ideas, and insights</p>
      </header>

      {/* Category + Search Box */}
      <div
        className="scroll-animate"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Category Dropdown */}
        <div style={{ position: "relative", zIndex: 1000 }}>

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              padding: "10px 20px",
              background: "#6a11cb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {selectedCategory || "Select Category"}
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                width: "200px",
                background: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                marginTop: "5px",
                overflow: "hidden",
                zIndex: 9999,
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    background: selectedCategory === cat ? "#6a11cb" : "#fff",
                    color: selectedCategory === cat ? "#fff" : "#333",
                    transition: "0.3s",
                  }}
                >
                  {cat}
                </div>
              ))}
              <div
                onClick={() => {
                  setSelectedCategory("");
                  setDropdownOpen(false);
                }}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  background: "#fff",
                  color: "#333",
                  borderTop: "1px solid #ccc",
                }}
              >
                Clear
              </div>
            </div>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "200px",
          }}
        />
      </div>

      {/* Blog Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
        }}
      >
        {filteredBlogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`} style={{ textDecoration: "none" }}>
            <div
              className="scroll-animate"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                transition: "all 0.4s ease",
                cursor: "pointer",
                background: "#fff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
            >
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "25px" }}>
                <h2
                  style={{
                    fontSize: "1.4rem",
                    marginBottom: "12px",
                    color: "#0f172a",
                    lineHeight: "1.4",
                  }}
                >
                  {blog.title}
                </h2>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#475569",
                    lineHeight: "1.6",
                  }}
                >
                  {blog.subTitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div
        className="scroll-animate"
        style={{
          marginTop: "5rem",
          padding: "3rem",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
          🚀 Book a Demo
        </h2>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Discover how our Newspaper platform can help grow your business, increase brand visibility, and reach thousands of potential customers.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: "12px", borderRadius: "10px", border: "none" }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ padding: "12px", borderRadius: "10px", border: "none" }}
          />
          <input
            type="tel"
            placeholder="Your Phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{ padding: "12px", borderRadius: "10px", border: "none" }}
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{ padding: "12px", borderRadius: "10px", border: "none" }}
          />
          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              background: "#fff",
              color: "#764ba2",
              transition: "0.3s",
            }}
          >
            🚀 Send Message on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
