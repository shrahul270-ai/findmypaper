"use client";
import React, { useRef, useEffect } from "react";

export default function HeroSection() {
  const sliderRef = useRef(null);

  useEffect(() => {
    // Auto slide for ad bar
    const container = sliderRef.current;
    if (!container) return;

    let animationFrame;
    const autoSlide = () => {
      container.scrollLeft += 1; // 👈 LEFT to RIGHT
      if (container.scrollLeft >= container.scrollWidth / 2) container.scrollLeft = 0;
      animationFrame = requestAnimationFrame(autoSlide);
    };
    animationFrame = requestAnimationFrame(autoSlide);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

 useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate"); // element animate
        } else {
          entry.target.classList.remove("animate"); // element wapas hide
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
      {/* Hero Section */}
      <section className="hero scroll-animate">
        {/* Background Video */}
        <video autoPlay muted loop className="bgVideo">
          <source src="/image/5243307-hd_1280_720_25fps.mp4" type="video/mp4" />
          Sorry, your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="overlay"></div>

        {/* Hero Text */}
        <div className="hero-text scroll-animate">
          <h1>Welcome to Our Brand</h1>
          <p>Experience the world in motion</p>
        </div>

        {/* Scrolling Ad Bar */}
        <div className="ad-bar scroll-animate" ref={sliderRef}>
          <div className="ad-track">
            <a href="https://samsung.com" target="_blank" rel="noreferrer">
              <img src="/image/samsung.jpg" alt="Samsung" />
            </a>
            <a href="https://apple.com" target="_blank" rel="noreferrer">
              <img src="/image/iphone.jpg" alt="Apple" />
            </a>
            <a href="https://nike.com" target="_blank" rel="noreferrer">
              <img src="/image/nike.webp" alt="Nike" />
            </a>
            <a href="https://coca-cola.com" target="_blank" rel="noreferrer">
              <img src="/image/coca-cola.jpg" alt="Coca-Cola" />
            </a>
            <a href="https://samsung.com" target="_blank" rel="noreferrer">
              <img src="/image/samsung.jpg" alt="Samsung" />
            </a>
            <a href="https://apple.com" target="_blank" rel="noreferrer">
              <img src="/image/iphone.jpg" alt="Apple" />
            </a>
          </div>
        </div>
      </section>

      {/* 🔥 Sliding Cards Section */}
      <section className="scratch-section scroll-animate">
        <h2 className="scratch-title scroll-animate">Trending Offers</h2>
        <div className="scratch-wrapper">
          <div className="scratch-track">
            <a href="https://www.reuters.com/" target="_blank" rel="noreferrer" className="scratch-card scroll-animate">
              <img src="/image/image46.jpg" alt="Global News" />
              <div className="card-content">
                <h3>Global News</h3>
                <p>Stay updated with worldwide headlines.</p>
              </div>
            </a>

            <a href="https://techcrunch.com/" target="_blank" rel="noreferrer" className="scratch-card scroll-animate">
              <img src="/image/image44.jpg" alt="Tech Trends" />
              <div className="card-content">
                <h3>Tech Trends</h3>
                <p>Latest innovations & AI updates.</p>
              </div>
            </a>

            <a href="https://www.espncricinfo.com/" target="_blank" rel="noreferrer" className="scratch-card scroll-animate">
              <img src="/image/image43.jpg" alt="Sports Highlights" />
              <div className="card-content">
                <h3>Sports Highlights</h3>
                <p>Match results & live updates.</p>
              </div>
            </a>

            <a href="https://www.reuters.com/" target="_blank" rel="noreferrer" className="scratch-card scroll-animate">
              <img src="/image/image42.jpg" alt="Global News" />
              <div className="card-content">
                <h3>Global News</h3>
                <p>Stay updated with worldwide headlines.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 🗞️ Latest News Cards Section */}
      <section className="latest-news-cards scroll-animate">
        <h2 className="news-title scroll-animate">Latest News</h2>
        <div className="news-cards-container">
          <a href="https://www.reuters.com/markets/" target="_blank" rel="noreferrer" className="news-card scroll-animate">
            <img src="/image/global.jpg" alt="Global Market" />
            <div className="news-content">
              <h3>Global Market Update</h3>
              <p>Stock markets surged today after positive economic news.</p>
            </div>
          </a>

          <a href="https://www.espncricinfo.com/" target="_blank" rel="noreferrer" className="news-card scroll-animate">
            <img src="/image/sports.jpg" alt="Sports News" />
            <div className="news-content">
              <h3>Sports Highlights</h3>
              <p>India secures a thrilling win in the T20 series.</p>
            </div>
          </a>

          <a href="https://techcrunch.com/" target="_blank" rel="noreferrer" className="news-card scroll-animate">
            <img src="/image/tech.jpg" alt="Tech News" />
            <div className="news-content">
              <h3>Tech Innovations</h3>
              <p>New AI tools are transforming businesses worldwide.</p>
            </div>
          </a>
        </div>
      </section>

      <section className="featured-section scroll-animate">
        <h2 className="featured-title scroll-animate">Editor’s Picks</h2>
        <div className="featured-container">
          <div className="featured-card scroll-animate">
            <img src="/image/abnews1.jpg" alt="Politics" />
            <div className="featured-content">
              <span className="tag politics">Politics</span>
              <h3>Government Announces New Economic Policy</h3>
              <p>The government has introduced a new policy aimed at boosting economic growth and employment.</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </div>

          <div className="featured-card scroll-animate">
            <img src="/image/abwes.webp" alt="World News" />
            <div className="featured-content">
              <span className="tag world">World</span>
              <h3>Global Leaders Meet for Climate Summit</h3>
              <p>World leaders gather to discuss urgent climate actions and sustainable development.</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </div>

          <div className="featured-card scroll-animate">
            <img src="/image/best.webp" alt="Science" />
            <div className="featured-content">
              <span className="tag science">Science</span>
              <h3>New Space Mission Achieves Major Milestone</h3>
              <p>Scientists celebrate a major breakthrough in space exploration technology.</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* 🏷️ Category Section */}
      <section className="category-section scroll-animate">
        <h2 className="scroll-animate">Explore Top Categories</h2>
        <div className="categories">
          <a href="https://www.financialexpress.com/" target="_blank" rel="noreferrer" className="category-card scroll-animate">
            <div className="category-image">
              <img src="/image/busienss.webp" alt="Business" />
            </div>
            <div className="category-content">
              <h3>Business</h3>
              <p>Stay ahead with the latest market insights, finance trends, and global trade updates.</p>
            </div>
          </a>

          <a href="https://www.thehindu.com/sci-tech/technology/" target="_blank" rel="noreferrer" className="category-card scroll-animate">
            <div className="category-image">
              <img src="/image/techno.webp" alt="Technology" />
            </div>
            <div className="category-content">
              <h3>Technology</h3>
              <p>Discover the newest innovations, AI tools, and tech revolutions shaping our future.</p>
            </div>
          </a>

          <a href="https://www.bollywoodlife.com/" target="_blank" rel="noreferrer" className="category-card scroll-animate">
            <div className="category-image">
              <img src="/image/entertainment.jfif" alt="Entertainment" />
            </div>
            <div className="category-content">
              <h3>Entertainment</h3>
              <p>Your daily dose of movies, celebrity news, and the latest trends from Bollywood.</p>
            </div>
          </a>
        </div>
      </section>

      {/* 🌟 Featured Services Section */}
      <section className="featured-services scroll-animate">
        <h2 className="section-title scroll-animate">Our Featured Services</h2>
        <div className="services-container">
          <div className="service-card scroll-animate">
            <i className="fas fa-newspaper service-icon"></i>
            <h3>Daily News Updates</h3>
            <p>Stay informed with our comprehensive daily news coverage from around the world.</p>
          </div>

          <div className="service-card scroll-animate">
            <i className="fas fa-chart-line service-icon"></i>
            <h3>Market Insights</h3>
            <p>Get expert analysis on global markets and make informed decisions.</p>
          </div>

          <div className="service-card scroll-animate">
            <i className="fas fa-video service-icon"></i>
            <h3>Video Coverage</h3>
            <p>Watch exclusive video reports on trending news and events.</p>
          </div>
        </div>
      </section>
    </>
  );
}
