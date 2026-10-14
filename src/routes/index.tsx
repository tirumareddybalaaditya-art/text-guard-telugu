import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UI, SAMPLES, scan, segments, level, type Lang, type Result } from "@/lib/scam";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scam Shield — Check suspicious messages" },
      { name: "description", content: "Paste a suspicious SMS, WhatsApp message or link and get a clear scam verdict in English or Telugu." },
      { property: "og:title", content: "Scam Shield — Check suspicious messages" },
      { property: "og:description", content: "Instant, private scam check for SMS, WhatsApp and links. English & Telugu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const V = {
  r: { box: "border-danger bg-danger-soft", bar: "bg-danger", icon: "🚨" },
  o: { box: "border-warn bg-warn-soft", bar: "bg-warn", icon: "⚠️" },
  g: { box: "border-safe bg-safe-soft", bar: "bg-safe", icon: "✅" },
};

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [text, setText] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const [empty, setEmpty] = useState(false);
  const u = UI[lang];

  const run = (t = text) => {
    const v = t.trim();
    if (!v) { setRes(null); setEmpty(true); return; }
    setEmpty(false); setRes(scan(v));
  };

  const say = () => {
    if (!res) return;
    try {
      const k = level(res.sc);
      const x = u[`v${k}` as "vr"] + ". " + res.fl.slice(0, 3).map((f) => f[lang]).join(" ");
      speechSynthesis.cancel();
      const s = new SpeechSynthesisUtterance(x);
      s.lang = lang === "te" ? "te-IN" : "en-IN";
      speechSynthesis.speak(s);
    } catch { /* unsupported */ }
  };

  const k = res ? level(res.sc) : "g";
  const card = "mb-3 rounded-2xl border border-border bg-card p-4";
  const h2 = "mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground";
  const chip = (on: boolean) =>
    `rounded-lg border border-border px-2.5 py-1.5 text-sm ${on ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`;

  return (
    <main className="mx-auto max-w-3xl px-4 pb-10 pt-5">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">🛡️ {u.t1}</h1>
        <div className="flex gap-1">
          <button className={chip(lang === "en")} onClick={() => setLang("en")}>EN</button>
          <button className={chip(lang === "te")} onClick={() => setLang("te")}>తెలుగు</button>
        </div>
      </div>
      <p className="mb-4 mt-1 text-muted-foreground">{u.t2}</p>

      <div className={card}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={u.ph}
          className="min-h-32 w-full resize-y rounded-xl border border-border bg-background p-3 outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="my-3 flex flex-wrap gap-1.5">
          {SAMPLES.map(([label, msg]) => (
            <button key={label} className={chip(false)} onClick={() => { setText(msg); run(msg); }}>{label}</button>
          ))}
        </div>
        <button onClick={() => run()} className="w-full rounded-xl bg-primary p-3.5 text-lg font-bold text-primary-foreground hover:opacity-90">
          {u.go}
        </button>
      </div>

      {empty && <div className={card}>{u.empty}</div>}

      {res && (
        <>
          <div className={`mb-3 rounded-2xl border-2 p-4 ${V[k].box}`}>
            <b className="block text-lg">{V[k].icon} {u[`v${k}` as "vr"]}</b>
            <div className="mb-1 mt-2.5 h-2.5 overflow-hidden rounded-full bg-border">
              <i className={`block h-full ${V[k].bar}`} style={{ width: `${Math.max(res.sc, 4)}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{res.sc}/100</span>{" "}
            <button className={chip(false)} onClick={say}>{u.say}</button>
          </div>

          <div className={card}>
            <h2 className={h2}>{u.why}</h2>
            {res.fl.length ? (
              <ul className="list-disc space-y-1.5 pl-5">{res.fl.map((f, i) => <li key={i}>{f[lang]}</li>)}</ul>
            ) : <p>{u.none}</p>}
          </div>

          <div className={card}>
            <h2 className={h2}>{u.msg}</h2>
            <div className="whitespace-pre-wrap break-words rounded-xl border border-border bg-background p-3">
              {segments(res.t, res.rg).map((s, i) =>
                s.mark ? <mark key={i} className={`rounded px-0.5 text-mark-foreground ${s.mark === "link" ? "bg-mark-link" : "bg-mark"}`}>{s.text}</mark> : <span key={i}>{s.text}</span>,
              )}
            </div>
          </div>

          {k !== "g" && (
            <div className={card}>
              <h2 className={h2}>{u.todo}</h2>
              <ul className="list-disc space-y-1.5 pl-5">
                {u.act.map((a, i) => <li key={i} className={i === 4 ? "font-bold" : ""}>{a}</li>)}
              </ul>
            </div>
          )}

          <div className={card}>
            <h2 className={h2}>{u.gold}</h2>
            <ul className="list-disc space-y-1.5 pl-5">{u.gr.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </div>
        </>
      )}

      <p className="text-xs text-muted-foreground">{u.nt}</p>
    </main>
  );
}
