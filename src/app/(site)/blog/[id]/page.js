"use client";
import React from "react";

import { useParams } from "next/navigation";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "The Future of AI",
    subTitle: "Exploring innovations in Artificial Intelligence",
    content: `Artificial Intelligence (AI) is transforming industries and everyday life. 
From self-driving cars to smart assistants, AI applications are everywhere. 
In this blog, we will explore the latest innovations in AI, potential challenges, 
and what the future holds for this rapidly evolving technology.`,
    image: "/image/6.jpg",
  },
  {
    id: 2,
    title: "Startup Success Tips",
    subTitle: "How to grow your business effectively",
    content: `Starting a business is exciting but challenging. 
In this blog, we will cover key strategies for startup success, 
including understanding your market, creating a solid business plan, 
building the right team, and securing funding. 
Practical tips will help your startup thrive in a competitive world.`,
    image: "/image/2.jpg",
  },
  {
    id: 3,
    title: "Movie Trends 2026",
    subTitle: "What's hot in the entertainment world",
    content: `The film industry is constantly evolving with new trends. 
From AI-generated content to immersive cinema experiences, 
we will explore the movies, genres, and technologies that will dominate in 2026. 
Stay ahead of the curve with insights into global entertainment.`,
    image: "/image/7.jpg",
  },
  {
    id: 4,
    title: "Healthy Living Hacks",
    subTitle: "Tips for a balanced lifestyle",
    content: `Living healthy is more than just eating right. 
In this blog, we share practical hacks for maintaining a balanced lifestyle, 
including nutrition tips, exercise routines, mindfulness practices, and 
ways to boost mental well-being. Achieve a healthier, happier life step by step.`,
    image: "/image/8.jpg",
  },
  {
    id: 5,
    title: "Top Travel Destinations",
    subTitle: "Explore the world's most beautiful places",
    content: `Traveling opens your mind to new experiences. 
Discover some of the world's most breathtaking travel destinations, 
from serene beaches to bustling cities and hidden gems. 
Get tips on planning your trip, must-see attractions, and cultural insights.`,
    image: "/image/9.jpg",
  },
  {
    id: 6,
    title: "Tech Gadgets 2026",
    subTitle: "Newest gadgets you must try",
    content: `The tech world never stops innovating. 
From smart home devices to wearable tech, discover the gadgets 
that will change the way you live in 2026. 
We provide reviews, pros and cons, and practical tips on making the most of these devices.`,
    image: "/image/10.jpg",
  },
];

const ads = [
  { id: 1, image: "/image/school.jpg", link: "https://rajshaladarpan.rajasthan.gov.in/" },
  { id: 2, image: "/image/college.jpg", link: "https://www.shiksha.com/" },
  { id: 3, image: "/image/cafe.jpg", link: "https://www.eazydiner.com/" },
  { id: 4, image: "/image/hotel.jpg", link: "https://www.makemytrip.com/" },
];

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = parseInt(params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) return <p style={{ padding: "2rem" }}>Blog not found</p>;

  return (
    <section style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Blog Header */}
      <header
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <img
          src={blog.image}
          alt={blog.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{blog.title}</h1>
          <p style={{ fontSize: "1.2rem", fontStyle: "italic" }}>{blog.subTitle}</p>
        </div>
      </header>

      {/* Main Content with Right Sidebar Ads */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Blog Content */}
        <main style={{ flex: "1" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-block",
              marginBottom: "1.5rem",
              color: "#6a11cb",
              fontWeight: "bold",
            }}
          >
            ← Back to Blogs
          </Link>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8", whiteSpace: "pre-line" }}>
            {blog.content}
          </p>
        </main>

        {/* Right Sidebar Ads */}
        <aside style={{ flex: "0 0 200px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {ads.map((ad) => (
            <a key={ad.id} href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.image}
                alt={`Ad ${ad.id}`}
                style={{ width: "100%", borderRadius: "10px", cursor: "pointer" }}
              />
            </a>
          ))}
        </aside>
      </div>
    </section>
  );
}