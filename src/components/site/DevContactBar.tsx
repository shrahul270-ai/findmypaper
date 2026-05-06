"use client";
import { useState } from "react";

export default function DevContactBar() {
  const [showPopup, setShowPopup] = useState(false);

  const phoneNumber = "919694953370";

  return (
    <>
      {/* Dev Contact Bar */}
      <div className="dev-contact-bar">
        <div className="marquee">
          <span>
            💡 Need help or have a question?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowPopup(true);
              }}
            >
              Contact the Developer / Owner
            </a>
          </span>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="close-btn" onClick={() => setShowPopup(false)}>
              ✖
            </div>

            <h3>📬 Contact Developer</h3>

            {/* Email */}
            <button
              onClick={() =>
                window.open("https://mail.google.com/mail/?view=cm&fs=1&to=support@balajiprimemedia.in")
              }
            >
              📧 Send Email
            </button>

            {/* WhatsApp */}
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/${phoneNumber}?text=Hello, I need help from Balaji Prime Media`
                )
              }
            >
              💬 Send WhatsApp Message
            </button>
          </div>
        </div>
      )}
    </>
  );
}
