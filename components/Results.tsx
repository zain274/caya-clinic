import Image from "next/image";
import Link from "next/link";

const shots = [
  ["before-after-1", "Before and after: smoother, lifted facial contours"],
  ["before-after-2", "Before and after: fresher, brighter skin"],
  ["before-after-3", "Before and after: improved skin tone and texture"],
  ["treatment-dr-falak", "Dr. Falak Waqas performing a facial treatment"],
  ["closeup-result", "Close-up of a client's clear, even skin"],
];

export default function Results() {
  return (
    <section id="results" className="section tint">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Real Results</h2>
            <p>See the difference. Real people. Real transformations.</p>
          </div>
          <Link href="#instagram" className="btn">View Gallery</Link>
        </div>
        <ul className="gallery">
          {shots.map(([f, alt]) => (
            <li key={f}><Image src={`/images/${f}.png`} alt={alt} width={206} height={206} sizes="(max-width: 700px) 45vw, 20vw" /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
