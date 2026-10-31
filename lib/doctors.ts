// Edit Dr. Falak details here. Add more doctors later by adding objects to the array.
export type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: "Skin" | "Hair" | "Aesthetic";
  education: string[];
  experienceYears: number;
  experience: string[];
  photo?: string;
};

export const doctors: Doctor[] = [
  {
    id: "falak-waqas",
    name: "Dr. Falak Waqas",
    title: "Aesthetic Physician & Founder",
    specialty: "Aesthetic",
    education: ["MBBS", "Diploma in Aesthetic Medicine"],
    experienceYears: 8,
    experience: ["Facial contouring & injectables", "Skin rejuvenation", "Founder, CAYA Clinic"],
    photo: "/images/treatment-dr-falak.png",
  },
];
