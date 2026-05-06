"use client";
import Image from "next/image";

export default function WhatsappButton() {
  const phoneNumber = "919694953370";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <Image
        src="/image/what-removebg-preview.png"
        alt="WhatsApp"
        width={100}
        height={100}
      />
    </a>
  );
}
