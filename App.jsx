import { useState } from "react";

// ─── LOGO SVG ─────────────────────────────────────────────────
function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <polygon points="12,22 27,72 40,44 53,72 68,22 75,22 57,82 40,52 23,82 5,22" fill="url(#lg1)" />
      <circle cx="83" cy="36" r="6" fill="#6d28d9" opacity="0.8" />
      <circle cx="91" cy="52" r="4" fill="#7c3aed" opacity="0.6" />
      <circle cx="87" cy="67" r="2.5" fill="#a855f7" opacity="0.4" />
    </svg>
  );
}

// ─── DATA ─────────────────────────────────────────────────────
const PLANS = [
  {
    id: "free", name: "Free", price: "₹0", period: "/month",
    color: "#6b7280", bg: "rgba(107,114,128,0.1)", border: "#374151",
    emails: 10,
    features: ["10 emails/month", "5 industries", "3 tones", "Basic support", "Copy to clipboard"],
    missing: ["Email history", "Bulk emails", "Priority support", "Custom templates"],
    cta: "Current Plan",
  },
  {
    id: "pro", name: "Pro", price: "₹499", period: "/month",
    color: "#a78bfa", bg: "rgba(124,58,237,0.12)", border: "#7c3aed",
    emails: 200, badge: "Most Popular",
    features: ["200 emails/month", "All 12 industries", "All 6 tones", "Email history", "Priority support", "Custom templates", "Download as PDF"],
    missing: ["Bulk emails", "API access"],
    cta: "Upgrade to Pro",
  },
  {
    id: "business", name: "Business", price: "₹1499", period: "/month",
    color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "#f59e0b",
    emails: 999999, badge: "Best Value",
    features: ["Unlimited emails", "All industries", "All tones", "Full history", "24/7 support", "Custom templates", "Bulk email send", "API access", "Team members (5)", "Analytics dashboard"],
    missing: [],
    cta: "Upgrade to Business",
  },
];

const INDUSTRIES = [
  { v: "ecommerce", l: "🛒 E-Commerce" }, { v: "saas", l: "💻 SaaS / Tech" },
  { v: "realestate", l: "🏠 Real Estate" }, { v: "healthcare", l: "🏥 Healthcare" },
  { v: "finance", l: "💰 Finance" }, { v: "education", l: "📚 Education" },
  { v: "marketing", l: "📣 Marketing" }, { v: "startup", l: "🚀 Startup" },
  { v: "legal", l: "⚖️ Legal" }, { v: "fashion", l: "👗 Fashion" },
  { v: "logistics", l: "🚚 Logistics" }, { v: "restaurant", l: "🍽️ Food & Restaurant" },
];

const PURPOSES = [
  "Cold Outreach / Sales", "Partnership Proposal", "Follow-up Email",
  "Product Launch", "Customer Re-engagement", "Investor Pitch",
  "Event Invitation", "Thank You / Appreciation",
];

const TONES = ["Professional", "Friendly", "Urgent", "Persuasive", "Formal", "Casual"];

const FAQS = [
  { q: "Kya ye bilkul free hai?", a: "Haan! Free plan mein 10 emails/month milti hain bina koi payment ke." },
  { q: "Email actually send hogi ya sirf generate hogi?", a: "Generate + copy hogi. Pro plan mein directly send bhi kar sakte ho." },
  { q: "Konsi industries support hoti hain?", a: "12+ industries — E-commerce, SaaS, Healthcare, Finance, Real Estate aur bahut kuch." },
  { q: "Plan kaise upgrade karein?", a: "Dashboard mein Upgrade button dabao, payment karo, turant activate ho jaata hai." },
  { q: "Data safe hai?", a: "Haan. Supabase encrypted database use hota hai. Koi third party access nahi." },
];

const TESTIMONIALS = [
  { name: "Rahul Sharma", role: "Startup Founder", text: "Wizably ne meri cold outreach rate 3x kar di! Pehle manually likhta tha, ab 10 second mein perfect email.", avatar: "R", stars: 5 },
  { name: "Priya Mehta", role: "Marketing Manager", text: "Industry-specific emails ka idea bahut smart hai. Client ko feel hota hai specially unke liye likha gaya.", avatar: "P", stars: 5 },
  { name: "Arjun Patel", role: "Real Estate Agent", text: "Har din 20-30 emails bhejta hoon. Pro plan liya — bilkul value for money!", avatar: "A", stars: 5 },
];

const HISTORY = [
  { id: 1, to: "john@techcorp.com", industry: "SaaS", purpose: "Cold Outreach", subject: "Transform Your Team's Productivity", date: "12 May 2026", status: "Copied" },
  { id: 2, to: "priya@realestate.in", industry: "Real Estate", purpose: "Follow-up", subject: "Following up on Bandra Property", date: "11 May 2026", status: "Copied" },
  { id: 3, to: "ceo@startup.io", industry: "Startup", purpose: "Investor Pitch", subject: "Wizably - AI Email SaaS Opportunity", date: "10 May 2026", status: "Copied" },
];

const DEMO = { name: "Aryan Singh", email: "aryan@wizably.com", plan: "free", used: 3, avatar: "A" };

export default function Wizably() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [authTab, setAuthTab] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authName, setAuthName] = useState("");
  const [authErr, setAuthErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [gStep, setGStep] = useState(1);
  const [rEmail, setREmail] = useState("");
  const [rName, setRName] = useState("");
  const [sName, setSName] = useState("");
  const [sCo, setSCo] = useState("");
  const [industry, setIndustry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Professional");
  const [ctx, setCtx] = useState("");
  const [loading, setLoading] = useState(false);
  const [genEmail, setGenEmail] = useState(null);
  const [copied, setCopied] = useState(false);
  const [genErr, setGenErr] = useState("");
  const [faqOpen, setFaqOpen] = useState(null);

  const login = () => {
    if (!authEmail || !authPass) { setAuthErr("Sab fields fill karo!"); return; }
    setUser({ ...DEMO, name: authName || DEMO.name, email: authEmail });
    setSName(authName || DEMO.name);
    setPage("dashboard");
    setAuthErr("");
  };

  const logout = () => { setUser(null); setPage("landing"); };

  const generate = async () => {
    setLoading(true); setGenErr(""); setGenEmail(null);
    const prompt = `Expert email copywriter. Generate personalized email.
Recipient: ${rEmail}, Name: ${rName || "Sir/Ma'am"}
Industry: ${industry}, Purpose: ${purpose}, Tone: ${tone}
Sender: ${sName}${sCo ? ` from ${sCo}` : ""}
Context: ${ctx || "None"}
Return ONLY JSON no markdown:
{"subject":"...","greeting":"...","body":"...","cta":"...","signoff":"..."}`;
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const d = await r.json();
      const txt = d.content.map(i => i.text || "").join("");
      setGenEmail(JSON.parse(txt.replace(/```json|```/g, "").trim()));
      setGStep(3);
    } catch { setGenErr("Kuch gadbad hui! Dobara try karo."); }
    finally { setLoading(false); }
  };

  const copyEmail = () => {
    if (!genEmail) return;
    navigator.clipboard.writeText(`Subject: ${genEmail.subject}\n\n${genEmail.greeting}\n\n${genEmail.body}\n\n${genEmail.cta}\n\n${genEmail.signoff}\n${sName}${sCo ? `\n${sCo}` : ""}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const resetGen = () => {
    setGStep(1); setGenEmail(null); setREmail(""); setRName("");
    setIndustry(""); setPurpose(""); setTone("Professional"); setCtx(""); setGenErr("");
  };

  const plan = PLANS.find(p => p.id === (user?.plan || "free"));
  const usedPct = Math.min(100, ((user?.used || 0) / (plan?.emails === 999999 ? 200 : plan?.emails || 10)) * 100);

  const g = {
    wrap: { minHeight: "100vh", background: "#09090f", color: "#ede9f8", fontFamily: "'Segoe UI',system-ui,sans-serif" },
    lnav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", borderBottom: "1px solid #16132a", position: "sticky", top: 0, zIndex: 200, background: "rgba(9,9,15,0.95)", backdropFilter: "blur(16px)" },
    brand: { display: "flex", alignItems: "center", gap: "8px" },
    brandTxt: { fontSize: "20px", fontWeight: "900", background: "linear-gradient(135deg,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    navLinks: { display: "flex", gap: "20px", alignItems: "center" },
    navLink: { color: "#7c6fa0", fontSize: "14px", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit" },
    purpBtn: { background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer" },
    outlineBtn: { background: "transparent", color: "#a78bfa", border: "1px solid #3d2d6a", padding: "10px 22px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer" },
    hero: { padding: "90px 32px 70px", maxWidth: "900px", margin: "0 auto", textAlign: "center" },
    badge: { display: "inline-block", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", color: "#a78bfa", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", marginBottom: "24px" },
    h1: { fontSize: "clamp(36px,7vw,72px)", fontWeight: "900", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "20px" },
    accent: { background: "linear-gradient(135deg,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    heroSub: { fontSize: "18px", color: "#7c6fa0", maxWidth: "520px", margin: "0 auto 40px", lineHeight: 1.6 },
    heroBtns: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },
    bigPurpBtn: { background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", border: "none", padding: "16px 36px", borderRadius: "10px", fontWeight: "800", fontSize: "17px", cursor: "pointer", boxShadow: "0 0 40px rgba(124,58,237,0.4)" },
    bigOutBtn: { background: "transparent", color: "#ede9f8", border: "1px solid #2d2640", padding: "16px 36px", borderRadius: "10px", fontWeight: "700", fontSize: "17px", cursor: "pointer" },
    statsBar: { display: "flex", justifyContent: "center", gap: "60px", padding: "40px 32px", borderTop: "1px solid #13111e", borderBottom: "1px solid #13111e", flexWrap: "wrap" },
    statNum: { fontSize: "36px", fontWeight: "900", background: "linear-gradient(135deg,#a78bfa,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    statLbl: { fontSize: "13px", color: "#7c6fa0", marginTop: "2px" },
    section: { padding: "72px 32px", maxWidth: "1000px", margin: "0 auto" },
    secLabel: { fontSize: "12px", color: "#7c3aed", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" },
    secH2: { fontSize: "clamp(26px,4vw,42px)", fontWeight: "900", letterSpacing: "-1px", marginBottom: "12px" },
    secSub: { color: "#7c6fa0", fontSize: "16px", marginBottom: "48px", maxWidth: "520px" },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" },
    fCard: { background: "#11101a", border: "1px solid #1d1a2e", borderRadius: "14px", padding: "28px" },
    fIcon: { fontSize: "32px", marginBottom: "14px" },
    fTitle: { fontSize: "17px", fontWeight: "800", marginBottom: "8px" },
    fDesc: { fontSize: "14px", color: "#7c6fa0", lineHeight: 1.6 },
    pGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" },
    pCard: (c, b) => ({ background: b, border: `2px solid ${c}`, borderRadius: "18px", padding: "28px", position: "relative" }),
    pBadge: (c) => ({ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: c, color: "#000", padding: "3px 16px", borderRadius: "12px", fontSize: "11px", fontWeight: "800", whiteSpace: "nowrap" }),
    pPrice: { fontSize: "38px", fontWeight: "900", letterSpacing: "-1px" },
    pPer: { fontSize: "14px", color: "#7c6fa0" },
    pFeat: { fontSize: "14px", color: "#c4b8e0", marginBottom: "8px", display: "flex", alignItems: "flex-start", gap: "8px" },
    pMiss: { fontSize: "14px", color: "#4a4060", marginBottom: "8px", display: "flex", alignItems: "flex-start", gap: "8px" },
    tGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "20px" },
    tCard: { background: "#11101a", border: "1px solid #1d1a2e", borderRadius: "14px", padding: "24px" },
    faqItem: { borderBottom: "1px solid #1d1a2e", padding: "18px 0", cursor: "pointer" },
    footer: { background: "#07070d", borderTop: "1px solid #13111e", padding: "40px 32px", textAlign: "center" },
    authPage: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at 30% 20%,#150d2e 0%,#09090f 60%)", padding: "24px" },
    authCard: { background: "#11101a", border: "1px solid #1d1a2e", borderRadius: "20px", padding: "36px 28px", width: "100%", maxWidth: "380px" },
    tabRow: { display: "flex", background: "#09090f", borderRadius: "10px", padding: "4px", marginBottom: "24px" },
    tab: (a) => ({ flex: 1, padding: "10px", border: "none", borderRadius: "8px", background: a ? "#7c3aed" : "transparent", color: a ? "#fff" : "#6b5f8a", fontSize: "14px", fontWeight: "700", cursor: "pointer" }),
    inp: { width: "100%", background: "#09090f", border: "1px solid #2a2040", borderRadius: "10px", padding: "12px 14px", color: "#ede9f8", fontSize: "14px", outline: "none", boxSizing: "border-box", marginTop: "6px" },
    lbl: { fontSize: "12px", color: "#6b5f8a", letterSpacing: "0.5px", textTransform: "uppercase" },
    appShell: { display: "flex", minHeight: "100vh" },
    sidebar: { width: "220px", background: "#0d0c16", borderRight: "1px solid #16132a", padding: "20px 0", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100 },
    sideTop: { padding: "16px 20px 24px", borderBottom: "1px solid #16132a", marginBottom: "8px" },
    sideLink: (a) => ({ display: "flex", alignItems: "center", gap: "10px", padding: "11px 20px", cursor: "pointer", background: a ? "rgba(124,58,237,0.15)" : "transparent", borderRight: a ? "3px solid #7c3aed" : "3px solid transparent", color: a ? "#a78bfa" : "#6b5f8a", fontSize: "14px", fontWeight: a ? "700" : "400" }),
    appMain: { marginLeft: "220px", flex: 1, padding: "28px 24px", maxWidth: "780px" },
    dGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "14px", marginBottom: "24px" },
    dCard: (c) => ({ background: "#11101a", border: `1px solid ${c}30`, borderRadius: "14px", padding: "20px" }),
    dNum: (c) => ({ fontSize: "28px", fontWeight: "900", color: c }),
    dLbl: { fontSize: "12px", color: "#6b5f8a", marginTop: "2px" },
    tRow: (i) => ({ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px", padding: "14px 16px", background: i % 2 === 0 ? "#11101a" : "transparent", borderRadius: "8px", alignItems: "center" }),
    settCard: { background: "#11101a", border: "1px solid #1d1a2e", borderRadius: "14px", padding: "24px", marginBottom: "16px" },
    card: { background: "#11101a", border: "1px solid #1d1a2e", borderRadius: "16px", padding: "24px" },
    cardH: { fontSize: "15px", fontWeight: "800", color: "#a78bfa", marginBottom: "20px" },
    genInp: { width: "100%", background: "#09090f", border: "1px solid #2a2040", borderRadius: "10px", padding: "11px 14px", color: "#ede9f8", fontSize: "14px", outline: "none", boxSizing: "border-box" },
    genSel: { width: "100%", background: "#09090f", border: "1px solid #2a2040", borderRadius: "10px", padding: "11px 14px", color: "#ede9f8", fontSize: "14px", outline: "none", boxSizing: "border-box", cursor: "pointer" },
    genLbl: { display: "block", fontSize: "11px", color: "#6b5f8a", marginBottom: "5px", letterSpacing: "0.5px", textTransform: "uppercase" },
    chip: (a) => ({ padding: "7px 14px", borderRadius: "20px", border: a ? "1px solid #7c3aed" : "1px solid #2a2040", background: a ? "rgba(124,58,237,0.15)" : "transparent", color: a ? "#a78bfa" : "#6b5f8a", fontSize: "13px", cursor: "pointer" }),
    purpFull: (d) => ({ width: "100%", background: d ? "#1d1a2e" : "linear-gradient(135deg,#7c3aed,#6d28d9)", color: d ? "#4a3d6a" : "#fff", border: "none", borderRadius: "10px", padding: "13px", fontSize: "15px", fontWeight: "800", cursor: d ? "not-allowed" : "pointer", marginTop: "18px" }),
    grayFull: { width: "100%", background: "transparent", color: "#7c6fa0", border: "1px solid #2a2040", borderRadius: "10px", padding: "12px", fontSize: "14px", cursor: "pointer", marginTop: "10px" },
    spinner: { width: "36px", height: "36px", border: "3px solid #1d1a2e", borderTop: "3px solid #7c3aed", borderRadius: "50%", margin: "0 auto 14px", animation: "spin 1s linear infinite" },
    progBar: { height: "6px", background: "#1d1a2e", borderRadius: "4px", overflow: "hidden", marginTop: "8px" },
    progFill: (pct) => ({ height: "100%", width: `${pct}%`, background: pct > 80 ? "linear-gradient(90deg,#ef4444,#dc2626)" : "linear-gradient(90deg,#7c3aed,#a855f7)", borderRadius: "4px" }),
  };

  // ─── APP SHELL ────────────────────────────────────────────────
  const AppShell = ({ children }) => (
    <div style={g.appShell}>
      <aside style={g.sidebar}>
        <div style={g.sideTop}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Logo size={28} /><span style={{ ...g.brandTxt, fontSize: "16px" }}>Wizably</span>
          </div>
        </div>
        {[
          { icon: "📊", label: "Dashboard", key: "dashboard" },
          { icon: "✉️", label: "Generate Email", key: "generator" },
          { icon: "📋", label: "History", key: "history" },
          { icon: "💎", label: "Upgrade", key: "pricing" },
          { icon: "⚙️", label: "Settings", key: "settings" },
        ].map(l => (
          <div key={l.key} style={g.sideLink(page === l.key)}
            onClick={() => { setPage(l.key); if (l.key === "generator") resetGen(); }}>
            <span>{l.icon}</span><span>{l.label}</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", borderTop: "1px solid #16132a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px" }}>
              {user?.avatar}
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "700" }}>{user?.name}</div>
              <div style={{ fontSize: "11px", color: "#6b5f8a" }}>{plan?.name} Plan</div>
            </div>
          </div>
          <button style={{ width: "100%", background: "transparent", color: "#6b5f8a", border: "1px solid #2a2040", borderRadius: "8px", padding: "8px", fontSize: "12px", cursor: "pointer" }} onClick={logout}>Logout</button>
        </div>
      </aside>
      <main style={g.appMain}>{children}</main>
    </div>
  );

  // ─── LANDING ──────────────────────────────────────────────────
  if (page === "landing") return (
    <div style={g.wrap}>
      <nav style={g.lnav}>
        <div style={g.brand}><Logo size={32} /><span style={g.brandTxt}>Wizably</span></div>
        <div style={g.navLinks}>
          <button style={g.navLink} onClick={() => setPage("pricing")}>Pricing</button>
          <button style={g.outlineBtn} onClick={() => setPage("login")}>Login</button>
          <button style={g.purpBtn} onClick={() => setPage("login")}>Free Shuru Karo →</button>
        </div>
      </nav>
      <section style={g.hero}>
        <div style={g.badge}>✦ AI-Powered Email Platform</div>
        <h1 style={g.h1}>Har Email<br /><span style={g.accent}>Industry-Specific,</span><br />Instantly Ready.</h1>
        <p style={g.heroSub}>Email address dein — Wizably AI us industry ke hisab se perfect, personalized email likhega. 10 second mein.</p>
        <div style={g.heroBtns}>
          <button style={g.bigPurpBtn} onClick={() => setPage("login")}>✨ Free Mein Try Karo</button>
          <button style={g.bigOutBtn} onClick={() => setPage("pricing")}>Plans Dekhein →</button>
        </div>
      </section>
      <div style={g.statsBar}>
        {[["10,000+","Emails Generated"],["12+","Industries"],["3 Sec","Avg. Time"],["98%","User Rating"]].map(([n,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={g.statNum}>{n}</div><div style={g.statLbl}>{l}</div>
          </div>
        ))}
      </div>
      <section style={g.section}>
        <div style={g.secLabel}>Features</div>
        <h2 style={g.secH2}>Sab Kuch Jo Chahiye</h2>
        <p style={g.secSub}>Ek powerful tool jo aapki email game completely badal de.</p>
        <div style={g.grid3}>
          {[
            {icon:"🏭",t:"12+ Industries",d:"E-commerce, SaaS, Healthcare, Finance, Real Estate — sab cover hain."},
            {icon:"🤖",t:"AI-Powered",d:"Claude AI se generate hoti hain — natural, human-like emails."},
            {icon:"⚡",t:"10 Second",d:"Koi typing nahi, koi thinking nahi — 10 second mein ready."},
            {icon:"🎯",t:"Smart Subject Lines",d:"High open-rate subject lines automatically generate hoti hain."},
            {icon:"🎭",t:"6 Tones",d:"Professional se Casual tak — aap decide karo mood kya ho."},
            {icon:"📋",t:"One-Click Copy",d:"Generate hone ke baad seedha clipboard mein — send karo."},
            {icon:"📊",t:"Email History",d:"Sab past emails save rehti hain — Pro plan mein."},
            {icon:"🔒",t:"Secure & Private",d:"Supabase encrypted database — koi data leak nahi."},
            {icon:"📱",t:"Mobile Friendly",d:"Phone pe bhi perfectly kaam karta hai."},
          ].map(f => (
            <div key={f.t} style={g.fCard}>
              <div style={g.fIcon}>{f.icon}</div>
              <div style={g.fTitle}>{f.t}</div>
              <div style={g.fDesc}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ ...g.section, borderTop: "1px solid #13111e" }}>
        <div style={g.secLabel}>Process</div>
        <h2 style={g.secH2}>Teen Steps. Perfect Email.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px" }}>
          {[
            {n:"01",icon:"✉️",t:"Email Enter Karo",d:"Recipient ka email aur basic info bharo."},
            {n:"02",icon:"🎯",t:"Industry Choose Karo",d:"12+ industries mein se apni target select karo."},
            {n:"03",icon:"✨",t:"AI Email Banaye",d:"Ek click — complete customized email ready."},
          ].map(s => (
            <div key={s.n} style={{ ...g.fCard, textAlign: "center" }}>
              <div style={{ fontSize: "44px", fontWeight: "900", color: "#1d1a2e", marginBottom: "4px" }}>{s.n}</div>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{s.icon}</div>
              <div style={g.fTitle}>{s.t}</div><div style={g.fDesc}>{s.d}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ ...g.section, borderTop: "1px solid #13111e" }}>
        <div style={g.secLabel}>Reviews</div>
        <h2 style={g.secH2}>Users Kya Kehte Hain</h2>
        <div style={g.tGrid}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={g.tCard}>
              <div style={{ color: "#fbbf24", fontSize: "16px", marginBottom: "12px" }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontSize: "14px", color: "#c4b8e0", lineHeight: 1.7, marginBottom: "16px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px" }}>{t.avatar}</div>
                <div><div style={{ fontSize: "14px", fontWeight: "700" }}>{t.name}</div><div style={{ fontSize: "12px", color: "#6b5f8a" }}>{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ ...g.section, borderTop: "1px solid #13111e" }}>
        <div style={g.secLabel}>FAQ</div>
        <h2 style={g.secH2}>Common Sawaal</h2>
        <div style={{ maxWidth: "620px" }}>
          {FAQS.map((f, i) => (
            <div key={i} style={g.faqItem} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "15px", fontWeight: "700" }}>{f.q}</span>
                <span style={{ color: "#7c3aed", fontSize: "18px" }}>{faqOpen === i ? "−" : "+"}</span>
              </div>
              {faqOpen === i && <p style={{ color: "#7c6fa0", fontSize: "14px", lineHeight: 1.7, marginTop: "10px", marginBottom: 0 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
      <section style={{ margin: "0 32px 72px", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", borderRadius: "20px", padding: "56px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: "900", letterSpacing: "-1px", marginBottom: "12px" }}>Abhi Free Mein Shuru Karo</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", marginBottom: "28px" }}>Koi credit card nahi. Seedha try karo.</p>
        <button style={{ background: "#fff", color: "#7c3aed", border: "none", padding: "16px 40px", borderRadius: "10px", fontSize: "17px", fontWeight: "900", cursor: "pointer" }} onClick={() => setPage("login")}>Free Account Banao →</button>
      </section>
      <footer style={g.footer}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
          <Logo size={24} /><span style={{ ...g.brandTxt, fontSize: "18px" }}>Wizably</span>
        </div>
        <p style={{ color: "#4a3d6a", fontSize: "13px", marginBottom: "8px" }}>AI-Powered Email Generator • Made with ❤️</p>
        <p style={{ color: "#3a2d5a", fontSize: "12px" }}>© 2026 Wizably. All rights reserved.</p>
      </footer>
    </div>
  );

  // ─── LOGIN ────────────────────────────────────────────────────
  if (page === "login") return (
    <div style={g.wrap}>
      <div style={g.authPage}>
        <div style={g.authCard}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "6px" }}>
            <Logo size={40} /><span style={{ ...g.brandTxt, fontSize: "24px" }}>Wizably</span>
          </div>
          <p style={{ textAlign: "center", color: "#6b5f8a", fontSize: "13px", marginBottom: "24px" }}>AI Email Generator ✦</p>
          <div style={g.tabRow}>
            <button style={g.tab(authTab === "login")} onClick={() => { setAuthTab("login"); setAuthErr(""); }}>Login</button>
            <button style={g.tab(authTab === "signup")} onClick={() => { setAuthTab("signup"); setAuthErr(""); }}>Sign Up</button>
          </div>
          {authTab === "signup" && (
            <div style={{ marginBottom: "14px" }}>
              <label style={g.lbl}>Tumhara Naam</label>
              <input style={g.inp} placeholder="Full naam" value={authName} onChange={e => setAuthName(e.target.value)} />
            </div>
          )}
          <div style={{ marginBottom: "14px" }}>
            <label style={g.lbl}>Email</label>
            <input style={g.inp} type="email" placeholder="email@example.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: "6px" }}>
            <label style={g.lbl}>Password</label>
            <div style={{ position: "relative" }}>
              <input style={{ ...g.inp, paddingRight: "44px" }} type={showPass ? "text" : "password"} placeholder="••••••••" value={authPass} onChange={e => setAuthPass(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}>{showPass ? "🙈" : "👁️"}</button>
            </div>
          </div>
          {authTab === "login" && <div style={{ textAlign: "right", marginBottom: "16px" }}><span style={{ fontSize: "12px", color: "#7c3aed", cursor: "pointer" }}>Forgot password?</span></div>}
          <button style={{ ...g.purpFull(false), marginTop: "8px" }} onClick={login}>{authTab === "signup" ? "Account Banao →" : "Login Karo →"}</button>
          {authErr && <div style={{ color: "#f87171", fontSize: "13px", textAlign: "center", marginTop: "10px", background: "rgba(248,113,113,0.08)", padding: "8px", borderRadius: "8px" }}>{authErr}</div>}
          <div style={{ marginTop: "20px", background: "#09090f", border: "1px solid #1d1a2e", borderRadius: "10px", padding: "12px", fontSize: "12px", color: "#6b5f8a" }}>
            <div style={{ color: "#a78bfa", fontWeight: "700", marginBottom: "4px" }}>🧪 Demo:</div>
            <div>Koi bhi email + password → Login ho jaao</div>
          </div>
          <button style={{ width: "100%", background: "transparent", color: "#6b5f8a", border: "none", marginTop: "16px", fontSize: "13px", cursor: "pointer" }} onClick={() => setPage("landing")}>← Wapas Home</button>
        </div>
      </div>
    </div>
  );

  // ─── DASHBOARD ────────────────────────────────────────────────
  if (page === "dashboard") return (
    <div style={g.wrap}>
      <AppShell>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.5px", marginBottom: "4px" }}>Namaste, {user?.name?.split(" ")[0]} 👋</h1>
          <p style={{ color: "#6b5f8a", fontSize: "14px" }}>Aaj kisko email karna hai?</p>
        </div>
        <div style={g.dGrid}>
          {[
            {n:user?.used||3,l:"Emails Used",c:"#a78bfa"},
            {n:(plan?.emails===999999?"∞":(plan?.emails||10)-(user?.used||3)),l:"Remaining",c:"#4ade80"},
            {n:plan?.name,l:"Current Plan",c:"#fbbf24"},
            {n:"98%",l:"Delivery Rate",c:"#60a5fa"},
          ].map(s => (
            <div key={s.l} style={g.dCard(s.c)}>
              <div style={g.dNum(s.c)}>{s.n}</div>
              <div style={g.dLbl}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ ...g.card, marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>Monthly Usage</span>
            <span style={{ fontSize: "13px", color: "#6b5f8a" }}>{user?.used||3} / {plan?.emails===999999?"Unlimited":plan?.emails} emails</span>
          </div>
          <div style={g.progBar}><div style={g.progFill(usedPct)} /></div>
          {usedPct > 70 && <p style={{ fontSize: "12px", color: "#fbbf24", marginTop: "8px" }}>⚠️ Limit khatam hone wali hai — Upgrade karo!</p>}
        </div>
        <div style={{ ...g.card, marginBottom: "20px" }}>
          <div style={g.cardH}>Quick Actions</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <button style={{ ...g.purpFull(false), marginTop: 0, padding: "14px" }} onClick={() => { resetGen(); setPage("generator"); }}>✨ Generate Email</button>
            <button style={{ ...g.grayFull, marginTop: 0, padding: "14px" }} onClick={() => setPage("history")}>📋 Email History</button>
            <button style={{ ...g.grayFull, marginTop: 0, padding: "14px" }} onClick={() => setPage("pricing")}>💎 Upgrade Plan</button>
            <button style={{ ...g.grayFull, marginTop: 0, padding: "14px" }} onClick={() => setPage("settings")}>⚙️ Settings</button>
          </div>
        </div>
        <div style={g.card}>
          <div style={g.cardH}>Recent Emails</div>
          {HISTORY.slice(0, 3).map((h, i) => (
            <div key={h.id} style={g.tRow(i)}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>{h.subject}</div>
                <div style={{ fontSize: "12px", color: "#6b5f8a" }}>{h.to}</div>
              </div>
              <div style={{ fontSize: "12px", color: "#6b5f8a" }}>{h.date}</div>
              <span style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", padding: "3px 10px", borderRadius: "10px", fontSize: "11px" }}>{h.status}</span>
            </div>
          ))}
        </div>
      </AppShell>
    </div>
  );

  // ─── GENERATOR ────────────────────────────────────────────────
  if (page === "generator") return (
    <div style={g.wrap}>
      <AppShell>
        <h1 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "4px" }}>Email Generator ✨</h1>
        <p style={{ color: "#6b5f8a", fontSize: "14px", marginBottom: "24px" }}>Details bharo — AI perfect email banayega</p>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          {[{n:1,l:"Recipient"},{n:2,l:"Settings"},{n:3,l:"Email"}].map((s,i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: gStep >= s.n ? "#7c3aed" : "#1d1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", color: gStep >= s.n ? "#fff" : "#4a3d6a" }}>{gStep > s.n ? "✓" : s.n}</div>
                <span style={{ fontSize: "12px", color: gStep === s.n ? "#a78bfa" : "#4a3d6a" }}>{s.l}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: "1px", background: "#1d1a2e", margin: "0 10px" }} />}
            </div>
          ))}
        </div>
        {gStep === 1 && (
          <div style={g.card}>
            <div style={g.cardH}>📩 Recipient Details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div><label style={g.genLbl}>Recipient Email *</label><input style={g.genInp} placeholder="john@company.com" value={rEmail} onChange={e => setREmail(e.target.value)} /></div>
              <div><label style={g.genLbl}>Recipient Name</label><input style={g.genInp} placeholder="John Smith" value={rName} onChange={e => setRName(e.target.value)} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><label style={g.genLbl}>Your Name *</label><input style={g.genInp} placeholder="Tumhara naam" value={sName} onChange={e => setSName(e.target.value)} /></div>
              <div><label style={g.genLbl}>Company</label><input style={g.genInp} placeholder="Brand/Company" value={sCo} onChange={e => setSCo(e.target.value)} /></div>
            </div>
            <button style={g.purpFull(!rEmail || !sName)} disabled={!rEmail || !sName} onClick={() => setGStep(2)}>Next: Settings →</button>
          </div>
        )}
        {gStep === 2 && (
          <div style={g.card}>
            <div style={g.cardH}>⚙️ Email Settings</div>
            <div style={{ marginBottom: "14px" }}><label style={g.genLbl}>Industry *</label><select style={g.genSel} value={industry} onChange={e => setIndustry(e.target.value)}><option value="">— Industry Select Karo —</option>{INDUSTRIES.map(i => <option key={i.v} value={i.v}>{i.l}</option>)}</select></div>
            <div style={{ marginBottom: "14px" }}><label style={g.genLbl}>Email Purpose *</label><select style={g.genSel} value={purpose} onChange={e => setPurpose(e.target.value)}><option value="">— Purpose Select Karo —</option>{PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
            <div style={{ marginBottom: "14px" }}>
              <label style={g.genLbl}>Tone</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
                {TONES.map(t => <button key={t} style={g.chip(tone === t)} onClick={() => setTone(t)}>{t}</button>)}
              </div>
            </div>
            <div><label style={g.genLbl}>Extra Context (Optional)</label><textarea style={{ ...g.genInp, minHeight: "70px", resize: "vertical", marginTop: "6px" }} placeholder="Product name, offer, special details..." value={ctx} onChange={e => setCtx(e.target.value)} /></div>
            {genErr && <div style={{ color: "#f87171", fontSize: "13px", marginTop: "10px", background: "rgba(248,113,113,0.08)", padding: "10px", borderRadius: "8px" }}>{genErr}</div>}
            <button style={g.purpFull(!industry || !purpose || loading)} disabled={!industry || !purpose || loading} onClick={generate}>{loading ? "Generating..." : "✨ AI Email Generate Karo"}</button>
            <button style={g.grayFull} onClick={() => setGStep(1)}>← Back</button>
          </div>
        )}
        {loading && (
          <div style={{ ...g.card, marginTop: "16px", textAlign: "center", padding: "44px" }}>
            <div style={g.spinner} />
            <div style={{ fontSize: "16px", fontWeight: "800", marginBottom: "6px" }}>AI Email Likh Raha Hai...</div>
            <div style={{ color: "#6b5f8a", fontSize: "13px" }}>Industry-specific content ban raha hai</div>
          </div>
        )}
        {gStep === 3 && genEmail && (
          <div style={g.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "#4ade80" }}>✓ Email Ready Hai!</div>
              <span style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", padding: "3px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: "700" }}>{tone}</span>
            </div>
            <div style={{ background: "#09090f", border: "1px solid #1d1a2e", borderRadius: "12px", padding: "20px", marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Subject Line</div>
              <div style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "-0.3px", marginBottom: "18px" }}>{genEmail.subject}</div>
              <div style={{ height: "1px", background: "#1d1a2e", margin: "0 0 16px" }} />
              <div style={{ fontSize: "14px", lineHeight: 1.8, color: "#c4b8e0", whiteSpace: "pre-wrap" }}>{genEmail.greeting}{"\n\n"}{genEmail.body}</div>
              <div style={{ height: "1px", background: "#1d1a2e", margin: "16px 0" }} />
              <div style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "10px", padding: "12px", fontSize: "14px", color: "#a78bfa", marginBottom: "14px" }}>📌 {genEmail.cta}</div>
              <div style={{ fontSize: "14px", color: "#c4b8e0", whiteSpace: "pre-wrap" }}>{genEmail.signoff}{"\n"}{sName}{sCo && `\n${sCo}`}</div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ flex: 1, background: copied ? "#14291a" : "linear-gradient(135deg,#7c3aed,#6d28d9)", color: copied ? "#4ade80" : "#fff", border: "none", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: "800", cursor: "pointer" }} onClick={copyEmail}>{copied ? "✓ Copied!" : "📋 Copy Email"}</button>
              <button style={{ flex: 1, background: "transparent", color: "#ede9f8", border: "1px solid #2a2040", borderRadius: "10px", padding: "13px", fontSize: "14px", cursor: "pointer" }} onClick={resetGen}>🔄 Naya Email</button>
            </div>
          </div>
        )}
      </AppShell>
    </div>
  );

  // ─── HISTORY ─────────────────────────────────────────────────
  if (page === "history") return (
    <div style={g.wrap}>
      <AppShell>
        <h1 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "4px" }}>Email History 📋</h1>
        <p style={{ color: "#6b5f8a", fontSize: "14px", marginBottom: "24px" }}>Tumhari sab past emails</p>
        {user?.plan === "free" ? (
          <div style={{ ...g.card, textAlign: "center", padding: "48px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
            <div style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}>Pro Feature</div>
            <p style={{ color: "#6b5f8a", fontSize: "14px", marginBottom: "24px" }}>Email history dekhne ke liye Pro plan chahiye.</p>
            <button style={{ ...g.purpFull(false), width: "auto", padding: "12px 32px", display: "inline-block", marginTop: 0 }} onClick={() => setPage("pricing")}>💎 Upgrade to Pro →</button>
          </div>
        ) : (
          <div style={g.card}>
            {HISTORY.map((h, i) => (
              <div key={h.id} style={{ ...g.tRow(i), gridTemplateColumns: "1fr auto auto", gap: "14px", marginBottom: "4px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700" }}>{h.subject}</div>
                  <div style={{ fontSize: "12px", color: "#6b5f8a" }}>{h.to} • {h.industry}</div>
                </div>
                <div style={{ fontSize: "12px", color: "#6b5f8a", whiteSpace: "nowrap" }}>{h.date}</div>
                <span style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", padding: "3px 10px", borderRadius: "10px", fontSize: "11px" }}>{h.status}</span>
              </div>
            ))}
          </div>
        )}
      </AppShell>
    </div>
  );

  // ─── PRICING ─────────────────────────────────────────────────
  if (page === "pricing") return (
    <div style={g.wrap}>
      <AppShell>
        <h1 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "4px" }}>Plans & Pricing 💎</h1>
        <p style={{ color: "#6b5f8a", fontSize: "14px", marginBottom: "24px" }}>Apni zaroorat ke hisab se plan choose karo</p>
        <div style={g.pGrid}>
          {PLANS.map(p => (
            <div key={p.id} style={{ ...g.pCard(p.color, p.bg), marginBottom: "8px" }}>
              {p.badge && <div style={g.pBadge(p.color)}>{p.badge}</div>}
              <div style={{ fontSize: "15px", fontWeight: "800", color: p.color, marginBottom: "8px" }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
                <span style={{ ...g.pPrice, color: p.color }}>{p.price}</span>
                <span style={g.pPer}>{p.period}</span>
              </div>
              <div style={{ fontSize: "13px", color: "#6b5f8a", marginBottom: "18px" }}>{p.emails === 999999 ? "Unlimited" : p.emails} emails/month</div>
              {p.features.map(f => <div key={f} style={g.pFeat}><span style={{ color: p.color }}>✓</span>{f}</div>)}
              {p.missing.map(f => <div key={f} style={g.pMiss}><span>✗</span>{f}</div>)}
              <button style={{ ...g.purpFull(p.id === (user?.plan || "free")), background: p.id === (user?.plan || "free") ? "#1d1a2e" : `linear-gradient(135deg,${p.color},${p.color}cc)`, marginTop: "16px", color: p.id === (user?.plan || "free") ? "#4a3d6a" : "#fff" }}>
                {p.id === (user?.plan || "free") ? "Current Plan ✓" : p.cta}
              </button>
            </div>
          ))}
        </div>
      </AppShell>
    </div>
  );

  // ─── SETTINGS ────────────────────────────────────────────────
  if (page === "settings") return (
    <div style={g.wrap}>
      <AppShell>
        <h1 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "4px" }}>Settings ⚙️</h1>
        <p style={{ color: "#6b5f8a", fontSize: "14px", marginBottom: "24px" }}>Account manage karo</p>
        <div style={g.settCard}>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "#a78bfa", marginBottom: "18px" }}>👤 Profile</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div><label style={g.genLbl}>Full Name</label><input style={{ ...g.genInp, marginTop: "6px" }} defaultValue={user?.name} /></div>
            <div><label style={g.genLbl}>Email</label><input style={{ ...g.genInp, marginTop: "6px" }} defaultValue={user?.email} /></div>
          </div>
          <div style={{ marginBottom: "14px" }}><label style={g.genLbl}>Company</label><input style={{ ...g.genInp, marginTop: "6px" }} placeholder="Tumhari company..." /></div>
          <button style={{ ...g.purpFull(false), width: "auto", padding: "11px 28px", marginTop: 0 }}>Save Changes</button>
        </div>
        <div style={g.settCard}>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "#a78bfa", marginBottom: "18px" }}>🔑 Password</div>
          <div style={{ marginBottom: "12px" }}><label style={g.genLbl}>Current Password</label><input style={{ ...g.genInp, marginTop: "6px" }} type="password" placeholder="••••••••" /></div>
          <div style={{ marginBottom: "12px" }}><label style={g.genLbl}>New Password</label><input style={{ ...g.genInp, marginTop: "6px" }} type="password" placeholder="••••••••" /></div>
          <button style={{ ...g.purpFull(false), width: "auto", padding: "11px 28px", marginTop: 0 }}>Update Password</button>
        </div>
        <div style={g.settCard}>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "#a78bfa", marginBottom: "18px" }}>💎 Current Plan</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "900", color: plan?.color }}>{plan?.name} Plan</div>
              <div style={{ fontSize: "13px", color: "#6b5f8a", marginTop: "4px" }}>{user?.used||3} / {plan?.emails===999999?"Unlimited":plan?.emails} emails used</div>
            </div>
            <button style={{ ...g.purpFull(false), width: "auto", padding: "10px 20px", marginTop: 0 }} onClick={() => setPage("pricing")}>Upgrade 💎</button>
          </div>
        </div>
        <div style={{ ...g.settCard, border: "1px solid rgba(239,68,68,0.2)" }}>
          <div style={{ fontSize: "14px", fontWeight: "800", color: "#f87171", marginBottom: "12px" }}>⚠️ Danger Zone</div>
          <button style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", cursor: "pointer" }}>Account Delete Karo</button>
        </div>
      </AppShell>
    </div>
  );

  return null;
}
