const items = [
  ["Expert Doctors", "Qualified & Experienced", "M12 2l3 6 6 .9-4.5 4.3L17.5 20 12 17l-5.5 3 1-6.8L3 8.9 9 8z"],
  ["Modern Technology", "Safe & Effective", "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v3M12 19v3M2 12h3M19 12h3"],
  ["Personalized Care", "Your Beauty, Our Priority", "M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z"],
  ["Clean & Safe Environment", "Hygienic & Comfortable", "M12 3c3 4 6 6.5 6 10a6 6 0 01-12 0c0-3.5 3-6 6-10z"],
];

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Why CAYA">
      <ul className="wrap">
        {items.map(([t, s, d]) => (
          <li key={t}>
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
            <span><b>{t}</b>{s}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
