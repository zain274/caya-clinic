import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="kicker">Reveal your natural beauty</p>
          <h1>Healthy Skin<br />Confident You</h1>
          <p className="lede">Advanced skincare, hair care and aesthetic treatments for natural, long-lasting results.</p>
          <div className="row">
            <Link href="#booking" className="btn">Book Appointment</Link>
            <Link href="#about" className="btn ghost">Watch Our Story</Link>
          </div>
        </div>
        <Image src="/images/hero.jpg" alt="Woman with glowing, healthy skin" width={1011} height={606} priority className="hero-img" />
      </div>
    </section>
  );
}
