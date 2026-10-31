"use client";
import { useState } from "react";
import { clinic } from "@/lib/clinic";

const treatments = ["Skin Treatments", "Hair Treatments", "Aesthetic Treatments", "Consultation / Not sure"];

export default function Booking() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const lines = [
      "Hello CAYA Clinic, I would like to book an appointment.",
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Treatment: ${get("treatment")}`,
      get("date") && `Preferred date: ${get("date")}`,
      get("message") && `Message: ${get("message")}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <section id="booking" className="section">
      <div className="wrap booking">
        <div>
          <h2>Book Your Appointment</h2>
          <p>Fill in the form and your message goes straight to our clinic on WhatsApp. We will confirm your slot.</p>
          <form onSubmit={onSubmit} className="form">
            <label>Full name<input name="name" required autoComplete="name" /></label>
            <label>Phone number<input name="phone" type="tel" required autoComplete="tel" placeholder="03XX XXXXXXX" /></label>
            <label>Treatment
              <select name="treatment" required defaultValue="">
                <option value="" disabled>Select a treatment</option>
                {treatments.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label>Preferred date<input name="date" type="date" /></label>
            <label className="full">Message (optional)<textarea name="message" rows={3} /></label>
            <button type="submit" className="btn full">Send on WhatsApp</button>
            <p className="full note" role="status">{sent ? "WhatsApp opened with your message. Press send there to reach the clinic." : ""}</p>
          </form>
        </div>
        <aside className="visit" aria-label="Clinic location and contact">
          <h3>Visit CAYA Clinic</h3>
          <address>{clinic.address}</address>
          <p><a href={`tel:${clinic.phoneTel}`}>Call {clinic.phoneDisplay}</a></p>
          <iframe
            title="CAYA Clinic on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent("CAYA Clinic, " + clinic.address)}&output=embed`}
          />
          <a className="btn ghost" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("CAYA Clinic, " + clinic.address)}`}>Get directions</a>
        </aside>
      </div>
    </section>
  );
}
