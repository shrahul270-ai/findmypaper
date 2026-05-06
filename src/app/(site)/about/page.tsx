"use client";
import DevContactBar from "../components/DevContactBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsappButton from "../components/WhatsappButton";
import Testimonial from "../components/Testimonial";
import GlobalCTA from "../components/GlobalCTA";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    // Scroll reveal animation on every scroll
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
    <>
      {/* About Hero Section */}
      <section className="about-hero scroll-animate">
        <h1>About balajiprimemedia</h1>
        <p>
          Our mission is to provide accurate, timely, and independent news
          coverage to keep our readers informed and empowered.
        </p>
      </section>

      <section className="section about-company scroll-animate">
        <h2>Our Mission & Vision</h2>
        <div className="about-content">
          <div className="about-card scroll-animate">
            <i className="fa-solid fa-bullseye"></i>
            <h3>Our Mission</h3>
            <p>
              To deliver trusted, unbiased, and timely news that keeps our
              readers informed and aware in today’s fast-changing world.
            </p>
          </div>

          <div className="about-card scroll-animate">
            <i className="fa-solid fa-lightbulb"></i>
            <h3>Our Vision</h3>
            <p>
              We aim to become the most reliable and innovative digital news
              platform in India, empowering every reader with knowledge.
            </p>
          </div>

          <div className="about-card scroll-animate">
            <i className="fa-solid fa-users"></i>
            <h3>Our Values</h3>
            <p>
              Integrity, accuracy, and transparency guide everything we publish.
              We believe journalism should build trust and awareness.
            </p>
          </div>
        </div>
      </section>

      <section className="why-choose-section scroll-animate">
        <h2 className="scroll-animate">Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-item scroll-animate">
            <i className="fa-solid fa-newspaper"></i>
            <h4>Reliable Reporting</h4>
            <p>
              Our team ensures every article is verified from trusted sources
              before publishing.
            </p>
          </div>

          <div className="why-item scroll-animate">
            <i className="fa-solid fa-bolt"></i>
            <h4>Fast Updates</h4>
            <p>
              We keep you ahead with real-time breaking news and instant
              notifications.
            </p>
          </div>

          <div className="why-item scroll-animate">
            <i className="fa-solid fa-globe"></i>
            <h4>Global Reach</h4>
            <p>
              Covering local to international stories with a unique Indian
              perspective.
            </p>
          </div>

          <div className="why-item scroll-animate">
            <i className="fa-solid fa-heart"></i>
            <h4>Community Driven</h4>
            <p>
              We value reader feedback and believe in responsible,
              people-centered journalism.
            </p>
          </div>

          <div className="why-item scroll-animate">
            <i className="fa-solid fa-shield-alt"></i>
            <h4>Data Security</h4>
            <p>
              Your privacy is our priority. We ensure complete protection of
              user information and activity.
            </p>
          </div>

          <div className="why-item scroll-animate">
            <i className="fa-solid fa-user-tie"></i>
            <h4>Expert Journalists</h4>
            <p>
              Our stories are written by experienced journalists who bring
              insight and depth to every report.
            </p>
          </div>
        </div>
      </section>

      <Testimonial />
      <GlobalCTA />
    </>
  );
}
