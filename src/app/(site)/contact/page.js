export default function Contact() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "80px 50px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#fdf5f0",
      minHeight: "100vh"
    }}>
      
      {/* Left Section */}
      <div style={{ flex: 1, paddingRight: "50px", maxWidth: "400px" }}>
        <h1 style={{ color: "#8B4513", fontSize: "36px", marginBottom: "10px" }}>Get in Touch</h1>
        <p style={{ color: "#5c4033", fontSize: "16px", marginBottom: "40px" }}>
          I'd like to hear from you!<br/>
          If you have any inquiries or just want to say hi, please use the contact form!
        </p>

        {/* Contact Info */}
        <p style={{ color: "#5c4033", fontSize: "14px", marginBottom: "10px" }}>
          📧 <a href="mailto:youremail@example.com" style={{ color: "#5c4033", textDecoration: "underline" }}>youremail@example.com</a>
        </p>
        
        {/* Social Icons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <a href="#" target="_blank">🐦</a>
          <a href="#" target="_blank">📘</a>
          <a href="#" target="_blank">📸</a>
          <a href="#" target="_blank">🔗</a>
        </div>
      </div>

      {/* Right Section - Form */}
      <div style={{ flex: 1, maxWidth: "450px" }}>
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="text" placeholder="First Name" style={inputStyle} />
            <input type="text" placeholder="Last Name" style={inputStyle} />
          </div>
          <input type="email" placeholder="Email*" style={inputStyle} />
          <textarea placeholder="Message" style={{ ...inputStyle, height: "120px" }}></textarea>
          <button type="submit" style={{
            backgroundColor: "#8B4513",
            color: "#fff",
            padding: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "4px"
          }}>Send</button>
        </form>
      </div>

    </div>
  )
}

const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
  width: "100%"
};
