"use client";
import { useState } from "react";

export default function NewFranchise() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSubmitted(true);

    // Future: yahan aap API call karke backend me data bhej sakte ho
    // fetch('/api/franchise', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <div className="container">
      <h1>Apply for New Franchise</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="franchise-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </label>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you">
          <h2>Thank you for applying!</h2>
          <p>We will contact you soon.</p>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 { text-align: center; margin-bottom: 30px; }
        form label { display: block; margin-bottom: 15px; }
        input, textarea {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border-radius: 4px;
          border: 1px solid #aaa;
        }
        button {
          background: #28a745;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          display: block;
          margin: 20px auto 0;
        }
        button:hover { background: #218838; }
        .thank-you { text-align: center; padding: 20px; }
      `}</style>
    </div>
  );
}
