export type Lang = "en" | "te";
export type Flag = { w: number; en: string; te: string };
export type Range = [number, number, boolean];
export type Result = { t: string; sc: number; fl: Flag[]; rg: Range[] };

export const UI = {
  en: { t1: "Scam Shield", t2: "Paste any suspicious SMS, WhatsApp message or link. Get a clear verdict and the reason, in simple words.", ph: "Paste the message here…", go: "Check this message", vr: "Very likely a scam", vo: "Suspicious – be careful", vg: "No obvious red flags found (this does not guarantee it is safe)", why: "Why it is risky", msg: "Message (red flags marked)", todo: "What to do now", gold: "Remember", say: "🔊 Read aloud", empty: "Please paste a message first.", none: "No known scam patterns were detected. If something still feels wrong, do not pay, click or share codes – ask someone you trust.",
    act: ["Do not click any link in it.", "Never share your OTP, PIN or password with anyone.", "Do not send money or pay any fee.", "Block the sender and report it.", "If money is lost, call 1930 right away or file a complaint at cybercrime.gov.in."],
    gr: ["Real banks never ask for your OTP, PIN or CVV.", "You never need to enter your PIN to RECEIVE money.", "Real jobs and loans never ask for money first.", "Free prize + hurry = trap."],
    nt: "Prototype using on-device rules. Your message is not uploaded or stored. It is a helper, not a guarantee. For serious fraud, use 1930 / cybercrime.gov.in." },
  te: { t1: "స్కామ్ షీల్డ్", t2: "అనుమానాస్పద SMS, WhatsApp మెసేజ్ లేదా లింక్‌ను పేస్ట్ చేయండి. ఎందుకు ప్రమాదమో సులభంగా చెబుతుంది.", ph: "మెసేజ్‌ను ఇక్కడ పేస్ట్ చేయండి…", go: "చెక్ చేయండి", vr: "ఇది స్కామ్ అయ్యే అవకాశం చాలా ఎక్కువ", vo: "అనుమానాస్పదం – జాగ్రత్త", vg: "స్పష్టమైన ప్రమాద సంకేతాలు కనిపించలేదు (కానీ 100% సురక్షితం అని కాదు)", why: "ఎందుకు ప్రమాదం?", msg: "మెసేజ్ (ప్రమాద సంకేతాలు గుర్తించబడ్డాయి)", todo: "ఇప్పుడు ఏం చేయాలి?", gold: "గుర్తుంచుకోండి", say: "🔊 చదివి వినిపించు", empty: "ముందు మెసేజ్ పేస్ట్ చేయండి.", none: "తెలిసిన స్కామ్ నమూనాలు కనిపించలేదు. అయినా అనుమానం ఉంటే డబ్బు కట్టవద్దు, లింక్ నొక్కవద్దు, కోడ్ చెప్పవద్దు – తెలిసినవారిని అడగండి.",
    act: ["అందులోని లింక్‌ను క్లిక్ చేయవద్దు.", "OTP, PIN, పాస్‌వర్డ్ ఎవరికీ చెప్పవద్దు.", "డబ్బు పంపవద్దు, ఫీజు కట్టవద్దు.", "పంపినవారిని బ్లాక్ చేసి రిపోర్ట్ చేయండి.", "డబ్బు పోతే వెంటనే 1930 కి కాల్ చేయండి లేదా cybercrime.gov.in లో ఫిర్యాదు చేయండి."],
    gr: ["నిజమైన బ్యాంకులు OTP, PIN, CVV ఎప్పుడూ అడగవు.", "డబ్బు అందుకోవడానికి PIN ఎంటర్ చేయాల్సిన అవసరం లేదు.", "నిజమైన ఉద్యోగం/లోన్ ముందే డబ్బు అడగదు.", "ఉచిత బహుమతి + తొందర = ఉచ్చు."],
    nt: "ఇది ప్రోటోటైప్. మీ మెసేజ్ అప్‌లోడ్ లేదా సేవ్ కాదు. ఇది సహాయకుడు మాత్రమే, హామీ కాదు. పెద్ద మోసాలకు 1930 / cybercrime.gov.in వాడండి." },
};

const RULES: { w: number; re: RegExp; en: string; te: string }[] = [
  { w: 35, re: /(collect request|approve (?:the |this )?(?:request|payment)|enter (?:your )?(?:upi )?pin to receive|scan (?:this )?qr (?:code )?to receive|to receive (?:money|payment|refund|cashback))/, en: 'It asks you to approve a request or enter your PIN to "receive" money. Entering a PIN only ever SENDS money out.', te: "డబ్బు అందుకోవడానికి 'అప్రూవ్' లేదా PIN ఎంటర్ చేయమంటున్నారు. PIN ఎంటర్ చేస్తే మీ డబ్బు పోతుంది, రాదు." },
  { w: 30, re: /(\b(?:otp|pin|cvv|password|aadhaar|aadhar)\b|ఓటీపీ|పాస్‌వర్డ్|పిన్)/, en: "It asks for a secret code (OTP / PIN / password). Real banks and officials never ask for these.", te: "OTP, PIN లేదా పాస్‌వర్డ్ అడుగుతున్నారు. నిజమైన బ్యాంకులు ఇవి ఎప్పుడూ అడగవు." },
  { w: 25, re: /(\b(?:registration|processing|training|joining|security|insurance|gst|tax) (?:fee|charge|deposit)s?\b|\bpay (?:rs\.?|₹|inr) ?\d+|refundable|ఫీజు)/, en: "It wants money first. A real job, loan or prize never asks you to pay before you receive anything.", te: "ముందుగా డబ్బు కట్టమంటున్నారు. నిజమైన ఉద్యోగం, లోన్, బహుమతి ముందే డబ్బు అడగవు." },
  { w: 25, re: /(lottery|lucky draw|you (?:have )?won|congratulations|winner|prize money|cashback reward|గెలుచుకున్నారు|లాటరీ|gelichaaru)/, en: "It says you won something. You cannot win a contest you never entered.", te: "మీరు గెలిచారు అంటున్నారు. మీరు పాల్గొనని పోటీలో గెలవరు. ఇది ఎర." },
  { w: 20, re: /(work from home|part[- ]?time job|no experience|earn (?:up to )?(?:rs\.?|₹) ?\d[\d,]*|(?:rs\.?|₹) ?\d[\d,]* ?(?:per|a|\/) ?(?:day|daily|hour)|daily income)/, en: "It promises big earnings for easy work. This is the classic bait of fake job offers.", te: "తక్కువ శ్రమకు ఎక్కువ సంపాదన అని ఆశ చూపిస్తున్నారు. ఇది నకిలీ ఉద్యోగాల ఎర." },
  { w: 20, re: /(\bkyc\b|verify your account|account (?:will be )?(?:blocked|suspended|closed|deactivated)|update (?:your )?(?:pan|aadhaar|account|details)|update cheyyandi|కేవైసీ)/, en: "It threatens your account and asks for KYC or details. Banks do not do KYC through links or messages.", te: "అకౌంట్ బ్లాక్ అవుతుందని భయపెట్టి వివరాలు అడుగుతున్నారు. బ్యాంకులు లింక్ ద్వారా KYC అడగవు." },
  { w: 20, re: /(instant loan|loan approved|pre-?approved loan|no cibil|no documents?|without documents?|loan in \d+ ?min\w*|లోన్)/, en: "It offers a loan with no documents. Such apps often copy your contacts and harass you later.", te: "పత్రాలు లేకుండా వెంటనే లోన్ అంటున్నారు. ఇలాంటి యాప్‌లు కాంటాక్ట్స్ తీసుకుని వేధిస్తాయి." },
  { w: 15, re: /(\b(?:urgent(?:ly)?|immediately|right now|within \d+ ?(?:hours?|hrs?|mins?|minutes?)|today only|last chance|final (?:warning|notice)|blocked?|suspend(?:ed)?|deactivat\w+|expires?)\b|ventane|block avutundi|వెంటనే|తక్షణం|బ్లాక్)/, en: "It rushes you with fear or a deadline. Scammers want you to act before you think.", te: "భయపెట్టి తొందర పెడుతున్నారు. ఆలోచించే సమయం ఇవ్వకుండా మోసం చేయడమే వీరి పద్ధతి." },
  { w: 15, re: /(parcel|courier|customs (?:duty|fee)|delivery (?:held|failed|charge)|పార్సిల్)/, en: "It mentions a parcel or courier fee. Fake delivery charges are a common trick.", te: "పార్సిల్ లేదా కొరియర్ పేరుతో ఫీజు అడుగుతున్నారు. ఇది ప్రసిద్ధ మోసం." },
  { w: 10, re: /((?:whatsapp|telegram) (?:me|us|group|channel|\+?\d{10})|join (?:our )?(?:telegram|whatsapp)|t\.me\/\S+|wa\.me\/\S+)/, en: "It tries to move you to a private chat (WhatsApp / Telegram) where nobody can check it.", te: "మిమ్మల్ని ప్రైవేట్ చాట్ (WhatsApp/Telegram) కు తీసుకెళ్లాలని చూస్తున్నారు." },
];
const LINK = /(?:https?:\/\/|www\.)[^\s]+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:xyz|top|click|link|icu|vip|cc|club|site|online|shop|live|buzz)(?:\/\S*)?|\b(?:bit\.ly|tinyurl\.com|cutt\.ly|rb\.gy|is\.gd|t\.co|shorturl\.at)\/\S+/;
const SHORT = ["bit.ly", "tinyurl.com", "cutt.ly", "rb.gy", "is.gd", "t.co", "shorturl.at"];
const TLD = /\.(xyz|top|click|link|icu|vip|cc|club|site|online|shop|live|buzz)$/;
const BR: Record<string, string[]> = { sbi: ["sbi.co.in", "onlinesbi.sbi", "sbi.bank.in"], hdfc: ["hdfcbank.com"], icici: ["icicibank.com"], axis: ["axisbank.com"], paytm: ["paytm.com"], phonepe: ["phonepe.com"], pnb: ["pnbindia.in"] };
const LF: Record<string, Flag> = {
  short: { w: 20, en: "is a shortened link that hides the real website.", te: "షార్ట్ లింక్ — అసలు వెబ్‌సైట్‌ను దాచేస్తుంది." },
  tld: { w: 20, en: "ends in an address type scammers use a lot.", te: "ఈ లింక్ ముగింపు మోసగాళ్లు తరచుగా వాడేది." },
  http: { w: 10, en: "is not a secure (https) link.", te: "లింక్ సురక్షితం కాదు (https లేదు)." },
  brand: { w: 30, en: "uses a bank / app name but is NOT its real website.", te: "లింక్ బ్యాంక్/యాప్ పేరు వాడుతోంది కానీ అది అసలు వెబ్‌సైట్ కాదు." },
};

export const SAMPLES: [string, string][] = [
  ["UPI request", "Congratulations! You will receive ₹5,000 cashback. Approve the collect request on your PhonePe and enter your UPI PIN to receive money now."],
  ["Job offer", "Work from home! Earn ₹5,000 per day, no experience needed. Pay registration fee ₹499 (refundable) today only. WhatsApp +919876543210"],
  ["Bank KYC", "SBI ALERT: Your account will be blocked within 24 hours. Update KYC immediately: http://sbi-kyc-update.xyz/login and share OTP."],
  ["Loan app", "Instant loan approved! No documents, no CIBIL. Download app: bit.ly/quickcash99 and get ₹50,000 in 5 minutes."],
  ["Telugu (Tenglish)", "Mee SBI account ventane block avutundi. KYC update cheyyandi: http://sbi-secure.top/kyc OTP cheppandi"],
  ["Safe message", "Hi Ravi, dinner at 8 tonight? Amma is making biryani. Call me when you leave."],
];

export function scan(t: string): Result {
  const fl: Flag[] = [], rg: Range[] = [], seen: Record<string, 1> = {}, keys: Record<number, 1> = {};
  let sc = 0;
  RULES.forEach((r, i) => {
    const re = new RegExp(r.re.source, "gi");
    let m: RegExpExecArray | null, f = false;
    while ((m = re.exec(t))) { f = true; rg.push([m.index, m.index + m[0].length, false]); if (!m[0].length) re.lastIndex++; }
    if (f) { fl.push({ w: r.w, en: r.en, te: r.te }); sc += r.w; keys[i] = 1; }
  });
  const re = new RegExp(LINK.source, "gi");
  let m: RegExpExecArray | null, hasL = false;
  while ((m = re.exec(t))) {
    const u = m[0].replace(/[.,;)\]!?]+$/, "");
    hasL = true; rg.push([m.index, m.index + u.length, true]);
    const h = (u.replace(/^https?:\/\//i, "").split(/[/?#]/)[0] ?? "").toLowerCase().replace(/^www\./, "");
    const ks: string[] = [];
    if (SHORT.includes(h)) ks.push("short");
    if (TLD.test(h)) ks.push("tld");
    if (/^http:\/\//i.test(u)) ks.push("http");
    for (const b in BR) if (h.includes(b) && !BR[b]!.some((d) => h === d || h.endsWith("." + d))) ks.push("brand");
    ks.forEach((k) => { const x = LF[k]!; fl.push({ w: x.w, en: `“${h}” ${x.en}`, te: `“${h}” ${x.te}` }); if (!seen[k]) { seen[k] = 1; sc += x.w; } });
  }
  if (hasL && keys[1]) sc += 10;
  if (keys[7] && (keys[1] || keys[2] || keys[5])) sc += 10;
  fl.sort((a, b) => b.w - a.w);
  return { t, sc: Math.min(100, sc), fl, rg };
}

export function segments(t: string, rg: Range[]) {
  const s = [...rg].sort((a, b) => a[0] - b[0]);
  const out: { text: string; mark?: "flag" | "link" }[] = [];
  let p = 0;
  for (const r of s) {
    if (r[0] < p) continue;
    out.push({ text: t.slice(p, r[0]) });
    out.push({ text: t.slice(r[0], r[1]), mark: r[2] ? "link" : "flag" });
    p = r[1];
  }
  out.push({ text: t.slice(p) });
  return out;
}

export const level = (sc: number) => (sc >= 55 ? "r" : sc >= 25 ? "o" : "g") as "r" | "o" | "g";
