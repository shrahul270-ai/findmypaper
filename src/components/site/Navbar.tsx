"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/image/balaji.png" alt="Logo" />
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </div>

      {/* Nav List */}
      <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
        <li className="nav-item">
          <Link href="/" className="nav-link active">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/about" className="nav-link">
            About
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/services" className="nav-link">
            Services
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </li>

        {/* Dropdown */}
        <li
          className={`nav-item dropdown ${dropdownOpen ? "active" : ""}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="nav-link dropdown-toggle">
            Franchise ▾
          </span>

          <ul className="dropdown-menu">
            <li>
              <Link href="/newfrenchise">Apply for New Franchise</Link>
            </li>
            <li>
              <Link href="/search">Search Franchise</Link>
            </li>
          </ul>
        </li>
      </ul>

      <div className="nav-buttons">
        <Link href="/login" className="btn btn-signin">
          Sign In
        </Link>
      </div>
    </nav>
  );
}
