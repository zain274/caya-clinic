import Link from "next/link";
import { clinic } from "@/lib/clinic";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <span className="logo">CAYA<small>SKIN · HAIR · AESTHETIC</small></span>
        <nav aria-label="Footer">
          <ul>
            {[["Home","/"],["Treatments","#treatments"],["Doctors","#doctors"],["About","#about"],["Gallery","#results"],["Contact","#booking"]].map(([l,h]) => <li key={l}><Link href={h}>{l}</Link></li>)}
          </ul>
        </nav>
        <p>© 2026 CAYA Clinic. All rights reserved.<br />{clinic.address}<br /><a href={`tel:${clinic.phoneTel}`}>{clinic.phoneDisplay}</a> · <a href={clinic.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></p>
      </div>
    </footer>
  );
}
