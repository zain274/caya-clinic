import { NextResponse } from "next/server";
import { clinic } from "@/lib/clinic";
import { doctors } from "@/lib/doctors";

export const runtime = "nodejs";

const MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
const MAX_MESSAGES = 10;
const MAX_CHARS = 1000;

const system = `You are the virtual assistant of CAYA Clinic (Skin, Hair, Aesthetic) in Karachi, Pakistan.
Clinic facts (use only these, never invent others):
- Address: ${clinic.address}
- Phone: ${clinic.phoneDisplay}
- WhatsApp: https://wa.me/${clinic.whatsapp}
- Instagram: ${clinic.instagram}
- Services: Skin Treatments, Hair Treatments, Aesthetic Treatments, Consultation.
- Doctors: ${doctors.map((d) => `${d.name} (${d.title}; education: ${d.education.join(", ")}; ${d.experienceYears}+ years; ${d.experience.join(", ")})`).join(" | ")}
- Booking: the "Book Your Appointment" form on this site sends the request to the clinic on WhatsApp.
Rules:
- Reply in the user's language (English, Urdu, or Roman Urdu). Keep answers short, warm, 2-5 sentences.
- Plain text only. No markdown, no asterisks, no headings.
- Do NOT diagnose, prescribe, or promise results. For medical concerns, suggest a consultation.
- Do NOT state prices, discounts, or timings unless listed above; say the clinic will confirm and share phone/WhatsApp.
- If asked something unrelated to the clinic, politely steer back.`;

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 10 * 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n += 1;
  return h.n > 20;
}

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ error: "Chat is not configured." }, { status: 500 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }); }

  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return NextResponse.json({ error: "Bad request." }, { status: 400 });

  const messages = raw
    .filter((m): m is { role: "user" | "assistant"; content: string } =>
      !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") return NextResponse.json({ error: "Bad request." }, { status: 400 });

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: system }, ...messages],
        temperature: 0.7,
        max_completion_tokens: 512, // Groq limit for this model
      }),
      signal: AbortSignal.timeout(40_000),
    });
    if (!res.ok) {
      console.error("Groq error", res.status, await res.text());
      return NextResponse.json({ error: "Assistant is busy. Please call or WhatsApp the clinic." }, { status: 502 });
    }
    const data = await res.json();
    let text: string = data?.choices?.[0]?.message?.content ?? "";
    text = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    const cut = data?.choices?.[0]?.finish_reason === "length";
    if (!text || /<think>/i.test(text) || (cut && text.length < 20)) {
      return NextResponse.json({ reply: `Sorry, I could not answer that. Please call ${clinic.phoneDisplay} or WhatsApp us.` });
    }
    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error("Chat failure", e);
    return NextResponse.json({ error: "Assistant is unavailable. Please call or WhatsApp the clinic." }, { status: 502 });
  }
}
