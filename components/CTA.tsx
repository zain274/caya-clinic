import Link from "next/link";
import { clinic } from "@/lib/clinic";

export default function CTA() {
  return (
    <section id="contact" className="cta">
      <div className="wrap cta-grid">
        <div>
          <h2>Ready to Look &amp; Feel Your Best?</h2>
          <p>Book your appointment today and take the first step towards a healthier, more confident you.</p>
        </div>
        <div className="row">
          <Link href="#booking" className="btn gold">Book Appointment</Link>
          <Link href={`https://wa.me/${clinic.whatsapp}`} className="btn outline">Chat on WhatsApp</Link>
        </div>
      </div>
    </section>
  );
}
