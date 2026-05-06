import "../site.css";
import DevContactBar from "@/components/site/DevContactBar";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsappButton from "@/components/site/WhatsappButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-root-wrapper">
      {/* Top Contact Bar */}
      <DevContactBar />

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsappButton />
    </div>
  );
}
