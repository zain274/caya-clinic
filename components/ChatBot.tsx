"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
const hello: Msg = { role: "assistant", content: "Assalam o Alaikum! I am CAYA Clinic's assistant. Ask me about treatments, our doctor, location or booking." };
const quick = ["Treatments?", "Clinic location", "How to book?"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([hello]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [msgs, busy, open]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  async function send(t: string) {
    const content = t.trim();
    if (!content || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next); setText(""); setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== hello) }),
      });
      const data = await res.json();
      setMsgs([...next, { role: "assistant", content: data.reply ?? data.error ?? "Something went wrong." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Network problem. Please try again." }]);
    } finally { setBusy(false); }
  }

  return (
    <>
      <button type="button" className="chat-fab" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="chat-panel" aria-label={open ? "Close chat" : "Open chat"}>
        {open ? "✕" : (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z" /></svg>
        )}
      </button>
      {open && (
        <section id="chat-panel" className="chat" role="dialog" aria-label="CAYA Clinic assistant">
          <header className="chat-head">
            <b>CAYA Assistant</b>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </header>
          <div className="chat-log" role="log" aria-live="polite">
            {msgs.map((m, i) => <p key={i} className={`bubble ${m.role}`}>{m.content}</p>)}
            {busy && <p className="bubble assistant dots" aria-label="Typing">…</p>}
            {msgs.length === 1 && (
              <div className="chat-quick">{quick.map((q) => <button key={q} type="button" className="chip" onClick={() => send(q)}>{q}</button>)}</div>
            )}
            <div ref={end} />
          </div>
          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(text); }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question…" maxLength={500} aria-label="Your message" />
            <button type="submit" className="btn" disabled={busy || !text.trim()}>Send</button>
          </form>
        </section>
      )}
    </>
  );
}
