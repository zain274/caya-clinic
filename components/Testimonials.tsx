"use client";
import { useState } from "react";

const quotes = [
  { q: "My skin has never looked better! The team is so professional and caring. Highly recommend!", n: "Ayesha Khan" },
  { q: "Amazing experience! The hair treatment really worked for me. Super satisfied!", n: "Sana Zulfiqar" },
  { q: "The best aesthetic clinic in Karachi. Clean, modern and very professional.", n: "Hina Ahmed" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + quotes.length) % quotes.length);
  return (
    <section className="section" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="wrap center">
        <h2>What Our Clients Say</h2>
        <p>Real stories. Real confidence.</p>
        <div className="carousel">
          <button type="button" className="arrow" onClick={() => go(-1)} aria-label="Previous testimonial">‹</button>
          <figure aria-live="polite" aria-atomic="true">
            <blockquote>“{quotes[i].q}”</blockquote>
            <figcaption>{quotes[i].n}</figcaption>
            <span className="count">{i + 1} of {quotes.length}</span>
          </figure>
          <button type="button" className="arrow" onClick={() => go(1)} aria-label="Next testimonial">›</button>
        </div>
      </div>
    </section>
  );
}
