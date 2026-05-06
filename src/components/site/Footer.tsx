
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        
        {/* LEFT */}
        <div className="footer-left">
          <h3>NewsPaper</h3>
          <p>Stay updated with the latest news from around the world.</p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/service">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/newfrenchise">Franchise</Link></li>
            <li><Link href="/sitemap">Sitemap</Link></li>
          </ul>
        </div>

        {/* PAYMENT */}
        <div className="footer-payment">
          <h4>Payment</h4>
          <p>Support our digital newspaper or buy premium access.</p>
          <Link href="/payment" className="payment-link">
            💳 Make a Payment
          </Link>
        </div>

        {/* CONTACT */}
        <div className="footer-right">
          <h4>Contact Us</h4>

    <div className="contact-email">
  <i className="fa-solid fa-envelope"></i>

  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@balajiprimemedia.in"
  target="_blank"
  className="email-link"
>
  support@balajiprimemedia.in
</a>


          </div>

          <p>Phone: +91 9694953370</p>

          {/* SOCIAL */}
          <div className="socials">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com/nearpaper/" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-telegram"></i></a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <p className="footer-bottom">
        © 2026 All rights reserved by{" "}
        <span>
          <a href="https://www.balajiprimemedia.in" target="_blank">
            balajiprimemedia
          </a>
        </span>
      </p>
    </footer>
  );
}
