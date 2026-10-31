"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { doctors } from "@/lib/doctors";

const filters = ["All", "Skin", "Hair", "Aesthetic"] as const;
const initials = (n: string) => n.replace(/^Dr\.?\s*/i, "").split(" ").map((w) => w[0]).slice(0, 2).join("");

export default function Doctors() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof filters)[number]>("All");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return doctors.filter((d) => {
      if (f !== "All" && d.specialty !== f) return false;
      if (!t) return true;
      const hay = [d.name, d.title, d.specialty, ...d.education, ...d.experience, `${d.experienceYears} years`].join(" ").toLowerCase();
      return t.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [q, f]);

  return (
    <section id="doctors" className="section">
      <div className="wrap">
        <p className="kicker">Our team</p>
        <h2>Meet Our Doctors</h2>
        <p>Education and experience of our doctor.</p>

        <div className="doc-tools">
          <label className="doc-search">
            <span className="sr">Search doctors</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. FCPS, laser, 10 years…" />
          </label>
        </div>

        <p className="note" role="status">{list.length} doctor{list.length === 1 ? "" : "s"} found</p>

        <ul className={`docs${list.length === 1 ? " single" : ""}`}>
          {list.map((d) => (
            <li key={d.id} className="doc">
              {d.photo ? (
                <Image src={d.photo} alt={`Portrait of ${d.name}`} width={240} height={240} className="doc-photo" />
              ) : (
                <div className="doc-photo avatar" role="img" aria-label={`${d.name} photo placeholder`}>{initials(d.name)}</div>
              )}
              <h3>{d.name}</h3>
              <p className="doc-title">{d.title}</p>
              <dl>
                <dt>Education</dt><dd>{d.education.join(" · ")}</dd>
                <dt>Experience</dt><dd><b>{d.experienceYears}+ years</b><br />{d.experience.join(", ")}</dd>
              </dl>
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="center">No doctor matches. Try another word.</p>}
      </div>
    </section>
  );
}
