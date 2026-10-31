import Image from "next/image";
import Link from "next/link";

const cards = [
  { name: "Skin Treatments", sub: "Brighten, rejuvenate, glow", img: "skin", alt: "Woman receiving a skin treatment" },
  { name: "Hair Treatments", sub: "Healthier hair, stronger roots", img: "hair", alt: "Long, glossy healthy hair" },
  { name: "Aesthetic Treatments", sub: "Enhance, rejuvenate, refresh", img: "aesthetic", alt: "Practitioner performing an aesthetic injection" },
];

export default function Treatments() {
  return (
    <section id="treatments" className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Our treatments</p>
            <h2>Skin, Hair &amp; Aesthetic</h2>
            <p>Comprehensive solutions for your skin, hair and overall beauty.</p>
          </div>
          <Link href="#" className="btn">View All Treatments</Link>
        </div>
        <ul className="cards">
          {cards.map((c) => (
            <li key={c.name}>
              <Link href="#" className="card">
                <Image src={`/images/${c.img}.jpg`} alt={c.alt} width={525} height={390} />
                <span className="card-label"><b>{c.name}</b>{c.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
