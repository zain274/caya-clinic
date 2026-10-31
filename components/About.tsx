import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about">
        <Image src="/images/clinic.jpg" alt="CAYA Clinic reception" width={714} height={450} />
        <div>
          <p className="kicker">About CAYA Clinic</p>
          <h2>Your Trusted Aesthetic Clinic in Karachi</h2>
          <p>At CAYA Clinic, we believe true beauty comes from healthy skin, confident hair and inner wellness. Our expert team provides personalized treatments using the latest technology and proven techniques, because you deserve the best.</p>
          <ul className="ticks">
            <li>Advanced Technology</li><li>Experienced Team</li><li>Natural &amp; Long-Lasting Results</li>
          </ul>
          <Link href="#" className="btn">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
