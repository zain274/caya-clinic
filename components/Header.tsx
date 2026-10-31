"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  ["Home", "/"], ["Treatments", "#treatments"], ["Doctors", "#doctors"], ["About", "#about"],
  ["Gallery", "#results"], ["Contact", "#booking"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="CAYA Clinic home">
        CAYA<small>SKIN · HAIR · AESTHETIC</small>
      </Link>
      <button type="button" className="menu-btn" aria-expanded={open} aria-controls="nav" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav id="nav" aria-label="Main" className={open ? "open" : ""}>
        <ul>{links.map(([l, h]) => <li key={l}><Link href={h} onClick={() => setOpen(false)}>{l}</Link></li>)}</ul>
      </nav>
      <Link href="#booking" className="btn head-cta">Book Appointment</Link>
    </header>
  );
}
