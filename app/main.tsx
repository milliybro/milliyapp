"use client";
import { useEffect, useRef, useState, useCallback } from "react";

function useCountdown(targetDate: any) {
  const calc = useCallback(() => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [targetDate]);
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return time;
}

function Digit({ val }: any) {
  const [prev, setPrev] = useState(val);
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    if (val !== prev) {
      setAnim(true);
      setTimeout(() => {
        setPrev(val);
        setAnim(false);
      }, 280);
    }
  }, [val, prev]);
  return (
    <span
      style={{
        display: "inline-block",
        transition: "transform .28s ease, opacity .28s ease",
        transform: anim ? "translateY(-10px)" : "none",
        opacity: anim ? 0 : 1,
      }}
    >
      {String(prev).padStart(2, "0")}
    </span>
  );
}

function Particles({ isDark }: any) {
  const particles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      dur: Math.random() * 14 + 8,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.35 + 0.08,
    })),
  ).current;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: isDark
              ? `rgba(${p.id % 3 === 0 ? "34,211,238" : p.id % 3 === 1 ? "251,146,60" : "139,92,246"},${p.opacity})`
              : `rgba(${p.id % 3 === 0 ? "14,165,233" : p.id % 3 === 1 ? "249,115,22" : "99,102,241"},${p.opacity})`,
            animation: `floatP ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function MilliyApp() {
  const [theme, setTheme] = useState("dark");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const launchDate = useRef(new Date("2026-05-01").toISOString()).current;
  const countdown = useCountdown(launchDate);
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveStep((s) => (s + 1) % 4), 2400);
    return () => clearInterval(timer);
  }, []);

  const handleEmail = () => {
    if (emailVal.includes("@")) {
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3500);
      setEmailVal("");
    }
  };

  const T = isDark
    ? {
        bg: "#06090e",
        bannerBg: "#04060b",
        border: "rgba(255,255,255,0.08)",
        text: "#f1f5f9",
        muted: "#64748b",
        subtle: "#334155",
        header: "rgba(6,9,18,0.9)",
        cardBg: "rgba(255,255,255,0.04)",
        gridLine: "rgba(255,255,255,0.025)",
        glowBlue: "rgba(59,130,246,0.18)",
        glowCyan: "rgba(34,211,238,0.12)",
        glowOrange: "rgba(251,146,60,0.1)",
        accent: "#22d3ee",
        accent2: "#fb923c",
        accent3: "#3b82f6",
        green: "#34d399",
        purple: "#a78bfa",
        logoBg: "linear-gradient(135deg,#3b82f6,#22d3ee,#fb923c)",
        heroGrad:
          "linear-gradient(135deg,#f1f5f9 20%,#22d3ee 60%,#fb923c 100%)",
        tickerColor: "#334155",
        mapBg: "linear-gradient(180deg,rgba(4,6,11,.96),rgba(15,23,42,.8))",
        overlayCard: "rgba(4,6,11,0.92)",
        featurePanelBg:
          "linear-gradient(135deg,rgba(59,130,246,0.1),rgba(34,211,238,0.08))",
        featurePanelBorder: "rgba(59,130,246,0.2)",
        performBg: "rgba(4,6,11,0.7)",
        partnerSectionBg:
          "linear-gradient(135deg,rgba(59,130,246,0.08),rgba(34,211,238,0.07),rgba(251,146,60,0.07))",
        partnerSectionBorder: "rgba(255,255,255,0.09)",
        partnerCardBg: "rgba(6,9,18,0.6)",
        ctaBg: "rgba(251,146,60,0.06)",
        ctaBgHover: "rgba(251,146,60,0.11)",
        ctaBorder: "rgba(251,146,60,0.2)",
        footerBorder: "rgba(255,255,255,0.06)",
        mapGridLine: "rgba(255,255,255,0.07)",
        btnSecBg: "rgba(255,255,255,0.05)",
        btnSecBgHover: "rgba(255,255,255,0.09)",
        btnSecBorder: "rgba(255,255,255,0.12)",
      }
    : {
        bg: "#f0f4f8",
        bannerBg: "#eaf0f6",
        border: "rgba(0,0,0,0.08)",
        text: "#0f172a",
        muted: "#64748b",
        subtle: "#94a3b8",
        header: "rgba(240,244,248,0.92)",
        cardBg: "rgba(255,255,255,0.88)",
        gridLine: "rgba(0,0,0,0.04)",
        glowBlue: "rgba(99,102,241,0.12)",
        glowCyan: "rgba(14,165,233,0.1)",
        glowOrange: "rgba(249,115,22,0.08)",
        accent: "#0ea5e9",
        accent2: "#f97316",
        accent3: "#6366f1",
        green: "#10b981",
        purple: "#8b5cf6",
        logoBg: "linear-gradient(135deg,#6366f1,#0ea5e9,#f97316)",
        heroGrad:
          "linear-gradient(135deg,#0f172a 20%,#0ea5e9 60%,#f97316 100%)",
        tickerColor: "#94a3b8",
        mapBg: "linear-gradient(180deg,#dbeafe,#e0f2fe)",
        overlayCard: "rgba(255,255,255,0.95)",
        featurePanelBg:
          "linear-gradient(135deg,rgba(99,102,241,0.07),rgba(14,165,233,0.06))",
        featurePanelBorder: "rgba(99,102,241,0.18)",
        performBg: "rgba(248,250,252,0.9)",
        partnerSectionBg:
          "linear-gradient(135deg,rgba(99,102,241,0.06),rgba(14,165,233,0.05),rgba(249,115,22,0.05))",
        partnerSectionBorder: "rgba(0,0,0,0.07)",
        partnerCardBg: "rgba(255,255,255,0.9)",
        ctaBg: "rgba(249,115,22,0.06)",
        ctaBgHover: "rgba(249,115,22,0.11)",
        ctaBorder: "rgba(249,115,22,0.22)",
        footerBorder: "rgba(0,0,0,0.08)",
        mapGridLine: "rgba(0,0,0,0.07)",
        btnSecBg: "rgba(0,0,0,0.04)",
        btnSecBgHover: "rgba(0,0,0,0.08)",
        btnSecBorder: "rgba(0,0,0,0.12)",
      };

  const services = [
    {
      icon: "🍔",
      title: "Food Delivery",
      color: T.accent2,
      glow: isDark ? "rgba(251,146,60,0.22)" : "rgba(249,115,22,0.16)",
      desc: "Sevimli taomlaringizni tezkor yetkazib berish — zamonaviy restoranlar va kafelar bilan.",
      tags: ["30 min", "200+ restoran", "Real-time"],
    },
    {
      icon: "🛒",
      title: "Market Delivery",
      color: T.green,
      glow: isDark ? "rgba(52,211,153,0.22)" : "rgba(16,185,129,0.16)",
      desc: "Do'konlardan kundalik mahsulotlarni uy yoki ofisgacha yetkazish xizmati.",
      tags: ["1 soat", "500+ mahsulot", "Fresco"],
    },
    {
      icon: "🚖",
      title: "Taxi",
      color: T.accent,
      glow: isDark ? "rgba(34,211,238,0.22)" : "rgba(14,165,233,0.16)",
      desc: "Shahar bo'ylab qulay, xavfsiz va tezkor harakatlanish uchun aqlli transport yechimi.",
      tags: ["5 min", "Xavfsiz", "Arzon"],
    },
    {
      icon: "📦",
      title: "Cargo & Courier",
      color: T.purple,
      glow: isDark ? "rgba(167,139,250,0.22)" : "rgba(139,92,246,0.16)",
      desc: "Hujjat, posilka va yirikroq jo'natmalar uchun moslashuvchan logistika xizmati.",
      tags: ["Express", "Katta hajm", "Sug'urta"],
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Xizmatni tanlang",
      icon: "◈",
      text: "Food, market, taxi yoki courier xizmatidan keraklisini tanlang.",
    },
    {
      num: "02",
      title: "Buyurtma bering",
      icon: "◉",
      text: "Bir necha bosqichda manzil, mahsulot yoki yo'nalishni kiriting.",
    },
    {
      num: "03",
      title: "Jarayonni kuzating",
      icon: "◎",
      text: "Buyurtma qabul qilinishi, yo'l chizig'i va ETA real vaqtda ko'rinadi.",
    },
    {
      num: "04",
      title: "Tez qabul qiling",
      icon: "✦",
      text: "MilliyApp xizmatlari bilan tez, qulay va ishonchli natijaga erishing.",
    },
  ];

  const features = [
    {
      icon: "◉",
      title: "Superapp ekotizimi",
      desc: "Oziq-ovqat, market, taxi, kargo va courier xizmatlarini bitta kuchli platformada.",
      color: T.accent,
    },
    {
      icon: "◎",
      title: "Real vaqt kuzatuvi",
      desc: "Buyurtma holati, courier harakati va yetib kelish vaqtini interaktiv kuzatish.",
      color: T.accent2,
    },
    {
      icon: "◌",
      title: "Hamkorlar uchun o'sish",
      desc: "Restoran, do'kon va haydovchilar uchun ko'proq buyurtma va qulay boshqaruv.",
      color: T.green,
    },
    {
      icon: "✦",
      title: "Tez va ishonchli logistika",
      desc: "Optimallashtirilgan yetkazib berish yo'llari va kuchli operatsion tizim.",
      color: T.purple,
    },
  ];

  const stats = [
    { value: "24/7", label: "Doimiy xizmat" },
    { value: "5+", label: "Xizmat yo'nalishi" },
    { value: "10x", label: "Hamkorlar uchun o'sish" },
    { value: "<30", label: "Daqiqada yetkazib berish" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { overflow-x: hidden; }

    @keyframes floatP { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-26px) scale(1.1);} }
    @keyframes pulseRing { 0%{transform:scale(1);opacity:.7;} 100%{transform:scale(2.5);opacity:0;} }
    @keyframes scan { 0%{top:0%;} 100%{top:102%;} }
    @keyframes slideUp { from{transform:translateY(38px);opacity:0;} to{transform:translateY(0);opacity:1;} }
    @keyframes glitch1 {
      0%,100%{clip-path:inset(0 0 95% 0);transform:translate(-2px,0);}
      20%{clip-path:inset(30% 0 60% 0);transform:translate(2px,0);}
      40%{clip-path:inset(60% 0 30% 0);transform:translate(-1px,0);}
      60%{clip-path:inset(10% 0 80% 0);transform:translate(1px,0);}
      80%{clip-path:inset(80% 0 10% 0);transform:translate(-2px,0);}
    }
    @keyframes glitch2 {
      0%,100%{clip-path:inset(50% 0 40% 0);transform:translate(2px,0);}
      25%{clip-path:inset(20% 0 70% 0);transform:translate(-2px,0);}
      50%{clip-path:inset(70% 0 20% 0);transform:translate(1px,0);}
      75%{clip-path:inset(5% 0 90% 0);transform:translate(-1px,0);}
    }
    @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
    @keyframes shimmer { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
    @keyframes rotateIn { from{transform:rotate(-5deg) scale(0.95);opacity:0;} to{transform:rotate(0) scale(1);opacity:1;} }
    @keyframes bounceIn { 0%{transform:scale(0.82);opacity:0;} 60%{transform:scale(1.04);} 100%{transform:scale(1);opacity:1;} }

    .glow-btn {
      position: relative; overflow: hidden;
      transition: transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
    }
    .glow-btn:hover { transform: translateY(-3px) scale(1.015); }
    .glow-btn::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(120deg,transparent 30%,rgba(255,255,255,.18) 50%,transparent 70%);
      transform: translateX(-100%); transition: transform .45s;
    }
    .glow-btn:hover::after { transform: translateX(100%); }

    .card-hover { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,.2); }

    .ticker-wrap { overflow: hidden; white-space: nowrap; }
    .ticker-inner { display: inline-flex; animation: marquee 28s linear infinite; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { border-radius: 99px; background: rgba(34,211,238,.28); }

    .mobile-menu-btn { display: none !important; }

    @media (max-width: 900px) {
      .desktop-nav { display: none !important; }
      .desktop-auth { display: none !important; }
      .mobile-menu-btn { display: flex !important; }
      .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
      .hero-card-wrap { display: none !important; }
      .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
      .services-grid { grid-template-columns: repeat(2,1fr) !important; }
      .features-grid { grid-template-columns: 1fr !important; }
      .features-right { grid-template-columns: repeat(2,1fr) !important; }
      .steps-grid { grid-template-columns: repeat(2,1fr) !important; }
      .step-connector { display: none !important; }
      .partners-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
      .partners-cards { grid-template-columns: repeat(2,1fr) !important; }
      .footer-inner { flex-direction: column !important; gap: 20px !important; text-align: center !important; }
      .footer-links { flex-wrap: wrap !important; justify-content: center !important; gap: 16px !important; }
      .cta-mini-bar { flex-direction: column !important; gap: 12px !important; }
      .hero-cta-btns { flex-direction: column !important; }
      .hero-cta-btns button { width: 100% !important; }
      .section-outer { padding: 40px 20px !important; }
      .header-inner { padding: 0 18px !important; }
      .partners-inner { padding: 28px 22px !important; }
    }
    @media (max-width: 540px) {
      .services-grid { grid-template-columns: 1fr !important; }
      .steps-grid { grid-template-columns: 1fr !important; }
      .features-right { grid-template-columns: 1fr !important; }
      .partners-cards { grid-template-columns: 1fr !important; }
      .countdown-row { gap: 8px !important; }
      .countdown-card { padding: 14px 16px !important; min-width: 66px !important; }
    }
  `;

  // ── THEME TOGGLE BUTTON (shared) ───────────────────────────────────────────
  const ThemeToggle = ({ style = {} }) => (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        border: `1px solid ${T.border}`,
        borderRadius: 99,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 18,
        transition: "all .2s",
        flexShrink: 0,
        ...style,
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );

  // ── COMING SOON BANNER ─────────────────────────────────────────────────────
  if (!bannerDismissed) {
    return (
      <>
        <style>{css}</style>
        <div
          style={{
            minHeight: "100vh",
            background: T.bannerBg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          <Particles isDark={isDark} />

          {/* Grid bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(${T.gridLine} 1px,transparent 1px),linear-gradient(90deg,${T.gridLine} 1px,transparent 1px)`,
              backgroundSize: "56px 56px",
              pointerEvents: "none",
            }}
          />

          {/* Ambient glows */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "8%",
              width: 520,
              height: 520,
              borderRadius: "50%",
              background: `radial-gradient(circle,${T.glowBlue},transparent 70%)`,
              filter: "blur(52px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "12%",
              right: "8%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `radial-gradient(circle,${T.glowOrange},transparent 70%)`,
              filter: "blur(52px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background: `radial-gradient(circle,${T.glowCyan},transparent 70%)`,
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Scan line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg,transparent,${isDark ? "rgba(34,211,238,0.6)" : "rgba(14,165,233,0.5)"},transparent)`,
              animation: "scan 5s linear infinite",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Theme toggle */}
          <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
            <ThemeToggle />
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 2,
              padding: "80px 20px",
              width: "100%",
              maxWidth: 660,
              textAlign: "center",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 13,
                marginBottom: 36,
                animation: "slideUp .7s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: T.logoBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 30px ${T.glowCyan}`,
                }}
              >
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: "#fff",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  M
                </span>
              </div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: "-.03em",
                    color: T.text,
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  MilliyApp
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: T.accent,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                  }}
                >
                  Delivery · Mobility · Logistics
                </div>
              </div>
            </div>

            {/* Badge */}
            <div
              style={{
                animation: "slideUp .8s .06s cubic-bezier(.22,1,.36,1) both",
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: `1px solid ${T.accent2}44`,
                  background: isDark
                    ? "rgba(251,146,60,0.09)"
                    : "rgba(249,115,22,0.08)",
                  borderRadius: 99,
                  padding: "8px 22px",
                  fontSize: 12,
                  color: T.accent2,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: T.accent2,
                    display: "inline-block",
                    boxShadow: `0 0 8px ${T.accent2}`,
                    animation: "pulseRing 1.6s ease-out infinite",
                  }}
                />
                Yangi xizmat tez orada
              </div>
            </div>

            {/* Glitch Title */}
            <div
              style={{
                animation: "slideUp .85s .12s cubic-bezier(.22,1,.36,1) both",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginBottom: 6,
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "clamp(52px,13vw,118px)",
                    fontWeight: 800,
                    letterSpacing: ".02em",
                    lineHeight: 1,
                    // background: T.heroGrad,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  TEZ KUNDA
                </h1>
                <h1
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "clamp(52px,13vw,118px)",
                    fontWeight: 800,
                    letterSpacing: ".02em",
                    lineHeight: 1,
                    color: T.accent,
                    opacity: 0.5,
                    // animation: "glitch1 5.5s infinite",
                    WebkitTextFillColor: T.accent,
                  }}
                >
                  TEZ KUNDA
                </h1>
                <h1
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "clamp(52px,13vw,118px)",
                    fontWeight: 800,
                    letterSpacing: ".02em",
                    lineHeight: 1,
                    color: T.accent2,
                    opacity: 0.38,
                    // animation: "glitch2 5.5s .4s infinite",
                    WebkitTextFillColor: T.accent2,
                  }}
                >
                  TEZ KUNDA
                </h1>
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(28px,8vw,68px)",
                  fontWeight: 800,
                  letterSpacing: ".06em",
                  color: T.accent,
                  textShadow: `0 0 48px ${T.accent}55`,
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                G'ALLAOROLDA
              </div>
            </div>

            <p
              style={{
                fontSize: "clamp(14px,3.5vw,17px)",
                color: T.muted,
                maxWidth: 520,
                margin: "0 auto 36px",
                lineHeight: 1.78,
                animation: "slideUp .9s .18s cubic-bezier(.22,1,.36,1) both",
              }}
            >
              O'zbekistonning eng zamonaviy superapp platformasi — food
              delivery, taxi, market va cargo xizmatlari bitta ilovada.
            </p>

            {/* Countdown */}
            <div
              className="countdown-row"
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                animation: "slideUp .95s .24s cubic-bezier(.22,1,.36,1) both",
                marginBottom: 36,
              }}
            >
              {[
                { v: countdown.days, l: "KUN" },
                { v: countdown.hours, l: "SOAT" },
                { v: countdown.minutes, l: "DAQIQA" },
                { v: countdown.seconds, l: "SONIYA" },
              ].map(({ v, l }, i) => (
                <div
                  key={l}
                  className="countdown-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.9)",
                    border: `1px solid ${i === 3 ? T.accent2 + "55" : T.accent + "44"}`,
                    borderRadius: 18,
                    padding: "18px 24px",
                    minWidth: 84,
                    backdropFilter: "blur(16px)",
                    boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.07)",
                    transition: "transform .2s, box-shadow .2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.07)";
                    e.currentTarget.style.boxShadow = `0 8px 28px ${i === 3 ? T.accent2 : T.accent}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = isDark
                      ? "none"
                      : "0 4px 20px rgba(0,0,0,0.07)";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: "clamp(26px,5.5vw,42px)",
                      fontWeight: 700,
                      color: i === 3 ? T.accent2 : T.accent,
                      textShadow: `0 0 20px ${i === 3 ? T.accent2 : T.accent}66`,
                      lineHeight: 1,
                    }}
                  >
                    <Digit val={v} />
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: T.muted,
                      letterSpacing: ".18em",
                      fontWeight: 700,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>

            {/* Email signup */}
            <div
              style={{
                animation: "slideUp 1s .3s cubic-bezier(.22,1,.36,1) both",
                width: "100%",
                maxWidth: 480,
                marginBottom: 22,
              }}
            >
              {emailSent ? (
                <div
                  style={{
                    background: isDark
                      ? "rgba(52,211,153,0.12)"
                      : "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(52,211,153,0.35)",
                    borderRadius: 18,
                    padding: "18px 24px",
                    textAlign: "center",
                    color: "#34d399",
                    fontWeight: 700,
                    fontSize: 15,
                    animation: "bounceIn .4s",
                  }}
                >
                  ✓ Muvaffaqiyatli! Ishga tushganda xabar qilamiz.
                </div>
              ) : (
                <div
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.92)",
                    border: `1px solid ${T.border}`,
                    borderRadius: 18,
                    padding: "6px 6px 6px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: isDark ? "none" : "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  <span style={{ fontSize: 15 }}>📧</span>
                  <input
                    type="email"
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmail()}
                    placeholder="Email manzilingizni kiriting..."
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: T.text,
                      fontSize: 14,
                      fontFamily: "'DM Sans',sans-serif",
                      minWidth: 0,
                    }}
                  />
                  <button
                    className="glow-btn"
                    onClick={handleEmail}
                    style={{
                      background: `linear-gradient(135deg,${T.accent3},${T.accent})`,
                      border: "none",
                      borderRadius: 13,
                      padding: "11px 20px",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Xabar olish
                  </button>
                </div>
              )}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: T.subtle,
                  marginTop: 10,
                }}
              >
                Ishga tushganda birinchilar qatorida xabar oling. Spam yo'q.
              </p>
            </div>

            {/* CTA button */}
            <button
              onClick={() => setBannerDismissed(true)}
              style={{
                animation: "slideUp 1s .38s cubic-bezier(.22,1,.36,1) both",
                background: "transparent",
                border: `1px solid ${T.border}`,
                borderRadius: 99,
                padding: "11px 30px",
                color: T.muted,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = T.text;
                e.currentTarget.style.borderColor = isDark
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.25)";
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = T.muted;
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.background = "transparent";
              }}
            >
              Platforma haqida ko'proq <span style={{ fontSize: 16 }}>↓</span>
            </button>
          </div>

          {/* Ticker */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: `1px solid ${T.border}`,
              padding: "12px 0",
              background: isDark
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.02)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="ticker-wrap">
              <div className="ticker-inner">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 11,
                        color: T.tickerColor,
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                        paddingRight: 48,
                      }}
                    >
                      MilliyApp · Food Delivery · Market · Taxi · Cargo &
                      Courier · G'allaorol · Real-time Tracking ·
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── FULL LANDING PAGE ──────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div
        style={{
          minHeight: "100vh",
          background: T.bg,
          color: T.text,
          overflowX: "hidden",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {/* Fixed background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(ellipse 80% 50% at 20% -10%,${T.glowBlue},transparent),radial-gradient(ellipse 60% 40% at 80% 5%,${T.glowCyan},transparent),radial-gradient(ellipse 70% 50% at 50% 100%,${T.glowOrange},transparent)`,
          }}
        />
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.4,
            backgroundImage: `linear-gradient(${T.gridLine} 1px,transparent 1px),linear-gradient(90deg,${T.gridLine} 1px,transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── HEADER ── */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            borderBottom: `1px solid ${T.border}`,
            backdropFilter: "blur(24px)",
            background: scrollY > 50 ? T.header : "transparent",
            transition: "background .3s",
          }}
        >
          <div
            className="header-inner"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 72,
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: T.logoBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 24px ${T.glowCyan}`,
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#fff",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  M
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "-.02em",
                    fontFamily: "'Syne',sans-serif",
                    color: T.text,
                  }}
                >
                  MilliyApp
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: T.accent,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}
                >
                  Delivery · Mobility
                </div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav
              className="desktop-nav"
              style={{ display: "flex", gap: 32, fontSize: 14 }}
            >
              {[
                ["#services", "Xizmatlar"],
                ["#features", "Afzalliklar"],
                ["#how", "Qanday ishlaydi"],
                ["#partners", "Hamkorlar"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    color: T.muted,
                    textDecoration: "none",
                    transition: "color .2s",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Desktop auth buttons + theme */}
            <div
              className="desktop-auth"
              style={{ display: "flex", gap: 10, alignItems: "center" }}
            >
              <ThemeToggle />
              <button
                style={{
                  background: "transparent",
                  border: `1px solid ${T.btnSecBorder}`,
                  borderRadius: 99,
                  padding: "9px 20px",
                  color: T.text,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isDark
                    ? "rgba(255,255,255,.28)"
                    : "rgba(0,0,0,.22)";
                  e.currentTarget.style.background = T.btnSecBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.btnSecBorder;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Kirish
              </button>
              <button
                className="glow-btn"
                style={{
                  background: `linear-gradient(135deg,${T.accent3},${T.accent})`,
                  border: "none",
                  borderRadius: 99,
                  padding: "9px 22px",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                Boshlash
              </button>
            </div>

            {/* Mobile: theme + burger */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ display: "flex" }}>
                <ThemeToggle style={{ display: "none" }} />
              </div>
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: "transparent",
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: 18,
                    height: 2,
                    background: T.text,
                    borderRadius: 2,
                    transition: "all .25s",
                    transform: mobileMenuOpen
                      ? "rotate(45deg) translate(4px,5px)"
                      : "none",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 18,
                    height: 2,
                    background: T.text,
                    borderRadius: 2,
                    transition: "opacity .25s",
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: 18,
                    height: 2,
                    background: T.text,
                    borderRadius: 2,
                    transition: "all .25s",
                    transform: mobileMenuOpen
                      ? "rotate(-45deg) translate(4px,-5px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div
              style={{
                borderTop: `1px solid ${T.border}`,
                background: T.header,
                backdropFilter: "blur(24px)",
                padding: "16px 20px 20px",
                animation: "fadeIn .22s",
              }}
            >
              {[
                ["#services", "Xizmatlar"],
                ["#features", "Afzalliklar"],
                ["#how", "Qanday ishlaydi"],
                ["#partners", "Hamkorlar"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "13px 0",
                    color: T.text,
                    textDecoration: "none",
                    fontWeight: 500,
                    borderBottom: `1px solid ${T.border}`,
                    fontSize: 15,
                  }}
                >
                  {label}
                </a>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <ThemeToggle />
                <button
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: `1px solid ${T.border}`,
                    borderRadius: 12,
                    padding: "12px 0",
                    color: T.text,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                  }}
                >
                  Kirish
                </button>
                <button
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg,${T.accent3},${T.accent})`,
                    border: "none",
                    borderRadius: 12,
                    padding: "12px 0",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14,
                  }}
                >
                  Boshlash
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Add theme toggle visibility fix for mobile */}
        <style>{`@media(max-width:900px){.desktop-auth{display:none!important;}}`}</style>

        <main style={{ position: "relative", zIndex: 1 }}>
          {/* ── HERO ── */}
          <section
            className="section-outer"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "80px 32px 60px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div
                onClick={() => setBannerDismissed(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  border: `1px solid ${T.accent2}44`,
                  background: isDark
                    ? "rgba(251,146,60,0.08)"
                    : "rgba(249,115,22,0.07)",
                  borderRadius: 99,
                  padding: "8px 20px",
                  fontSize: 13,
                  color: T.accent2,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = isDark
                    ? "rgba(251,146,60,0.14)"
                    : "rgba(249,115,22,0.13)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = isDark
                    ? "rgba(251,146,60,0.08)"
                    : "rgba(249,115,22,0.07)")
                }
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: T.accent2,
                    boxShadow: `0 0 10px ${T.accent2}`,
                    display: "inline-block",
                    animation: "pulseRing 1.5s ease-out infinite",
                  }}
                />
                Tez kunda G'allaorolda ishga tushadi →
              </div>
            </div>

            <div
              className="hero-grid"
              style={{
                display: "grid",
                gap: 64,
                gridTemplateColumns: "1.1fr 0.9fr",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "clamp(42px,6vw,80px)",
                    fontWeight: 900,
                    letterSpacing: "-.04em",
                    lineHeight: 1.05,
                    marginBottom: 24,
                    color: T.text,
                  }}
                >
                  Yetkazib berishning{" "}
                  <span
                    style={{
                      background: `linear-gradient(135deg,${T.accent3} 0%,${T.accent} 50%,${T.accent2} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      backgroundSize: "200%",
                      animation: "shimmer 4s linear infinite",
                    }}
                  >
                    yangi darajasi
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: 18,
                    color: T.muted,
                    lineHeight: 1.8,
                    maxWidth: 500,
                    marginBottom: 36,
                  }}
                >
                  MilliyApp — food delivery, market delivery, taxi, courier va
                  cargo xizmatlarini birlashtirgan professional platforma.
                  Mijozlar uchun qulaylik, hamkorlar uchun o'sish.
                </p>

                <div
                  className="hero-cta-btns"
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 48,
                  }}
                >
                  <button
                    className="glow-btn"
                    style={{
                      background: `linear-gradient(135deg,${T.accent3},${T.accent})`,
                      border: "none",
                      borderRadius: 16,
                      padding: "15px 32px",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    Ilovani sinab ko'rish
                  </button>
                  <button
                    style={{
                      background: T.btnSecBg,
                      border: `1px solid ${T.btnSecBorder}`,
                      borderRadius: 16,
                      padding: "15px 32px",
                      color: T.text,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                      transition: "background .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = T.btnSecBgHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = T.btnSecBg)
                    }
                  >
                    Hamkor bo'lish
                  </button>
                </div>

                <div
                  className="stats-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: 12,
                  }}
                >
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="card-hover"
                      style={{
                        background: T.cardBg,
                        border: `1px solid ${T.border}`,
                        borderRadius: 16,
                        padding: "16px",
                        boxShadow: isDark
                          ? "none"
                          : "0 2px 12px rgba(0,0,0,0.06)",
                        cursor: "default",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 900,
                          color: T.accent,
                          fontFamily: "'JetBrains Mono',monospace",
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{ fontSize: 12, color: T.muted, marginTop: 4 }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero card */}
              <div className="hero-card-wrap" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    left: -40,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "rgba(59,130,246,.15)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -40,
                    right: -40,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "rgba(251,146,60,.12)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    background: T.cardBg,
                    border: `1px solid ${T.border}`,
                    borderRadius: 28,
                    padding: 20,
                    backdropFilter: "blur(24px)",
                    boxShadow: isDark ? "none" : "0 8px 48px rgba(0,0,0,0.09)",
                    animation:
                      "rotateIn .8s .2s cubic-bezier(.22,1,.36,1) both",
                  }}
                >
                  <div
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(248,250,252,0.8)",
                      border: `1px solid ${T.border}`,
                      borderRadius: 22,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 12, color: T.muted }}>
                          Live Operations
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: T.text,
                            fontFamily: "'Syne',sans-serif",
                          }}
                        >
                          MilliyApp Control
                        </div>
                      </div>
                      <div
                        style={{
                          background: "rgba(52,211,153,.12)",
                          border: "1px solid rgba(52,211,153,.25)",
                          borderRadius: 99,
                          padding: "5px 14px",
                          fontSize: 12,
                          color: "#34d399",
                          fontWeight: 600,
                        }}
                      >
                        ● Online
                      </div>
                    </div>

                    {/* Map area */}
                    <div
                      style={{
                        borderRadius: 18,
                        overflow: "hidden",
                        height: 300,
                        border: `1px solid ${T.border}`,
                        background: T.mapBg,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          opacity: 0.2,
                          backgroundImage: `linear-gradient(${T.mapGridLine} 1px,transparent 1px),linear-gradient(90deg,${T.mapGridLine} 1px,transparent 1px)`,
                          backgroundSize: "32px 32px",
                        }}
                      />
                      <svg
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                        }}
                        viewBox="0 0 400 300"
                      >
                        <defs>
                          <linearGradient
                            id="routeGrad"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop offset="0%" stopColor={T.accent2} />
                            <stop offset="50%" stopColor={T.accent} />
                            <stop offset="100%" stopColor={T.accent3} />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 60 70 Q 150 40 220 80 Q 290 120 340 200"
                          stroke="url(#routeGrad)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="6 4"
                          opacity=".7"
                        />
                        <path
                          d="M 50 200 Q 130 160 200 180 Q 270 200 330 160"
                          stroke="rgba(52,211,153,.5)"
                          strokeWidth="1.5"
                          fill="none"
                          strokeDasharray="4 3"
                        />
                      </svg>

                      {[
                        { x: "15%", y: "22%", c: T.accent2, label: "Pickup" },
                        { x: "55%", y: "25%", c: T.accent, label: "En route" },
                        { x: "84%", y: "65%", c: T.accent3, label: "Delivery" },
                        { x: "13%", y: "68%", c: "#34d399", label: "Idle" },
                      ].map(({ x, y, c, label }) => (
                        <div
                          key={label}
                          style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            transform: "translate(-50%,-50%)",
                          }}
                        >
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              background: c,
                              boxShadow: `0 0 20px ${c}`,
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                inset: -4,
                                borderRadius: "50%",
                                border: `1.5px solid ${c}`,
                                animation: "pulseRing 2s ease-out infinite",
                                opacity: 0.5,
                              }}
                            />
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              top: 18,
                              left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: 9,
                              color: c,
                              whiteSpace: "nowrap",
                              fontWeight: 600,
                              letterSpacing: ".05em",
                            }}
                          >
                            {label}
                          </div>
                        </div>
                      ))}

                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: T.overlayCard,
                          backdropFilter: "blur(12px)",
                          border: `1px solid ${T.border}`,
                          borderRadius: 14,
                          padding: "10px 14px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: T.muted,
                            marginBottom: 3,
                          }}
                        >
                          Aktiv buyurtma
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: T.text,
                          }}
                        >
                          Toshkent City → Chilonzor
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: T.accent,
                            marginTop: 4,
                            fontFamily: "'JetBrains Mono',monospace",
                          }}
                        >
                          ETA: 12 min
                        </div>
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          background: T.overlayCard,
                          backdropFilter: "blur(12px)",
                          border: `1px solid ${T.border}`,
                          borderRadius: 14,
                          padding: "12px 14px",
                          width: 200,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: T.text,
                            }}
                          >
                            Courier status
                          </span>
                          <span style={{ fontSize: 11, color: "#34d399" }}>
                            Yo'lda
                          </span>
                        </div>
                        <div
                          style={{
                            height: 6,
                            background: isDark
                              ? "rgba(255,255,255,.08)"
                              : "rgba(0,0,0,.08)",
                            borderRadius: 99,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: "73%",
                              background: `linear-gradient(90deg,${T.accent3},${T.accent})`,
                              borderRadius: 99,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 8,
                            fontSize: 10,
                            color: T.muted,
                          }}
                        >
                          <span>Pickup</span>
                          <span>Delivery</span>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        gap: 8,
                        marginTop: 12,
                      }}
                    >
                      {services.map((s) => (
                        <div
                          key={s.title}
                          style={{
                            background: T.cardBg,
                            border: `1px solid ${T.border}`,
                            borderRadius: 12,
                            padding: "10px 4px",
                            textAlign: "center",
                            fontSize: 12,
                            color: T.muted,
                            cursor: "pointer",
                            transition: "background .2s, border-color .2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark
                              ? "rgba(34,211,238,.08)"
                              : "rgba(14,165,233,.08)";
                            e.currentTarget.style.borderColor = T.accent + "44";
                            e.currentTarget.style.color = T.text;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = T.cardBg;
                            e.currentTarget.style.borderColor = T.border;
                            e.currentTarget.style.color = T.muted;
                          }}
                        >
                          {s.icon} {s.title.split(" ")[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── TICKER ── */}
          <div
            style={{
              borderTop: `1px solid ${T.border}`,
              borderBottom: `1px solid ${T.border}`,
              padding: "14px 0",
              margin: "20px 0",
              background: isDark ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.02)",
            }}
          >
            <div className="ticker-wrap">
              <div className="ticker-inner">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 12,
                        color: T.tickerColor,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        paddingRight: 48,
                      }}
                    >
                      Food Delivery · Market · Taxi · Cargo & Courier ·
                      Real-time Tracking · G'allaorol · MilliyApp ·
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* ── SERVICES ── */}
          <section
            id="services"
            className="section-outer"
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div style={{ marginBottom: 48 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: T.accent,
                  marginBottom: 12,
                }}
              >
                Xizmatlar
              </div>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(32px,5vw,56px)",
                  fontWeight: 900,
                  letterSpacing: "-.03em",
                  maxWidth: 500,
                  color: T.text,
                }}
              >
                Bitta platforma,
                <br />
                ko'p imkoniyat
              </h2>
            </div>

            {/* Tab buttons */}
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 32,
              }}
            >
              {services.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveTab(i)}
                  style={{
                    background:
                      activeTab === i
                        ? isDark
                          ? "rgba(34,211,238,.12)"
                          : "rgba(14,165,233,.1)"
                        : T.cardBg,
                    border: `1px solid ${activeTab === i ? T.accent + "44" : T.border}`,
                    borderRadius: 99,
                    padding: "9px 20px",
                    color: activeTab === i ? T.accent : T.muted,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    transition: "all .25s",
                  }}
                >
                  {s.icon} {s.title}
                </button>
              ))}
            </div>

            <div
              className="services-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
              }}
            >
              {services.map((service, i: any) => (
                <div
                  key={service.title}
                  className="card-hover"
                  onClick={() => setActiveTab(i)}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    background:
                      activeTab === i || hoveredService === i
                        ? isDark
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(255,255,255,0.96)"
                        : T.cardBg,
                    border: `1px solid ${activeTab === i ? service.color + "55" : T.border}`,
                    borderRadius: 24,
                    padding: 24,
                    cursor: "pointer",
                    boxShadow:
                      activeTab === i
                        ? `0 0 40px ${service.glow}`
                        : isDark
                          ? "none"
                          : "0 2px 12px rgba(0,0,0,0.05)",
                    transition: "all .25s",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: service.glow,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      marginBottom: 20,
                      border: `1px solid ${service.color}22`,
                      transition: "transform .25s",
                      transform:
                        hoveredService === i ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 10,
                      color: T.text,
                      fontFamily: "'Syne',sans-serif",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: T.muted,
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    {service.desc}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,.05)"
                            : "rgba(0,0,0,.05)",
                          border: `1px solid ${T.border}`,
                          borderRadius: 99,
                          padding: "3px 10px",
                          fontSize: 11,
                          color: T.muted,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 13,
                      fontWeight: 600,
                      color: service.color,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    Batafsil{" "}
                    <span
                      style={{
                        transition: "transform .2s",
                        transform:
                          hoveredService === i
                            ? "translateX(5px)"
                            : "translateX(0)",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES ── */}
          <section
            id="features"
            className="section-outer"
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div
              className="features-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              <div
                style={{
                  background: T.featurePanelBg,
                  border: `1px solid ${T.featurePanelBorder}`,
                  borderRadius: 28,
                  padding: 36,
                  boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: T.accent3,
                    marginBottom: 16,
                  }}
                >
                  Afzalliklar
                </div>
                <h2
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "clamp(28px,4vw,44px)",
                    fontWeight: 900,
                    letterSpacing: "-.03em",
                    lineHeight: 1.1,
                    marginBottom: 20,
                    color: T.text,
                  }}
                >
                  Professional.
                  <br />
                  Interaktiv.
                  <br />
                  Ishonchli.
                </h2>
                <p
                  style={{ color: T.muted, lineHeight: 1.8, marginBottom: 28 }}
                >
                  MilliyApp nafaqat buyurtma ilovasi, balki logistika va mobil
                  xizmatlarni boshqaruvchi kuchli raqamli platforma.
                </p>
                <div
                  style={{
                    background: T.performBg,
                    borderRadius: 20,
                    padding: 20,
                    border: `1px solid ${T.border}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: T.muted,
                          marginBottom: 4,
                        }}
                      >
                        System performance
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 32,
                          fontWeight: 700,
                          color: T.accent,
                        }}
                      >
                        98.9%
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(52,211,153,.1)",
                        border: "1px solid rgba(52,211,153,.25)",
                        borderRadius: 12,
                        padding: "6px 14px",
                        fontSize: 12,
                        color: "#34d399",
                        fontWeight: 600,
                      }}
                    >
                      Stable
                    </div>
                  </div>
                  {[
                    { label: "Delivery flow", val: 92, c: T.text },
                    { label: "Tracking system", val: 96, c: T.accent },
                    { label: "Payment gateway", val: 99, c: "#34d399" },
                  ].map(({ label, val, c }) => (
                    <div key={label} style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: T.muted,
                          marginBottom: 6,
                        }}
                      >
                        <span>{label}</span>
                        <span
                          style={{ fontFamily: "'JetBrains Mono',monospace" }}
                        >
                          {val}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          background: isDark
                            ? "rgba(255,255,255,.06)"
                            : "rgba(0,0,0,.07)",
                          borderRadius: 99,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${val}%`,
                            background: `linear-gradient(90deg,${T.accent3},${c})`,
                            borderRadius: 99,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="features-right"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="card-hover"
                    style={{
                      background: T.cardBg,
                      border: `1px solid ${T.border}`,
                      borderRadius: 24,
                      padding: 24,
                      boxShadow: isDark
                        ? "none"
                        : "0 2px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: `${f.color}18`,
                        border: `1px solid ${f.color}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        color: f.color,
                        marginBottom: 18,
                      }}
                    >
                      {f.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        marginBottom: 10,
                        color: T.text,
                        fontFamily: "'Syne',sans-serif",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}
                    >
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section
            id="how"
            className="section-outer"
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: T.accent2,
                  marginBottom: 12,
                }}
              >
                Qanday ishlaydi
              </div>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(32px,5vw,56px)",
                  fontWeight: 900,
                  letterSpacing: "-.03em",
                  color: T.text,
                }}
              >
                4 ta oddiy bosqich
              </h2>
            </div>
            <div
              className="steps-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
                position: "relative",
              }}
            >
              <div
                className="step-connector"
                style={{
                  position: "absolute",
                  top: 48,
                  left: "12.5%",
                  right: "12.5%",
                  height: 1,
                  background: `linear-gradient(90deg,transparent,${T.accent}44,${T.accent2}44,transparent)`,
                }}
              />
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="card-hover"
                  onClick={() => setActiveStep(i)}
                  style={{
                    background:
                      activeStep === i
                        ? isDark
                          ? "rgba(255,255,255,0.07)"
                          : "rgba(255,255,255,0.96)"
                        : T.cardBg,
                    border: `1px solid ${activeStep === i ? (i < 2 ? T.accent : T.accent2) + "55" : T.border}`,
                    borderRadius: 24,
                    padding: "28px 24px",
                    position: "relative",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow:
                      activeStep === i
                        ? isDark
                          ? `0 0 30px ${i < 2 ? T.accent + "22" : T.accent2 + "22"}`
                          : "0 8px 32px rgba(0,0,0,.08)"
                        : isDark
                          ? "none"
                          : "0 2px 8px rgba(0,0,0,.04)",
                    transition: "all .3s",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background:
                        i < 2
                          ? `linear-gradient(135deg,${T.accent3}33,${T.accent}33)`
                          : `linear-gradient(135deg,${T.accent2}33,${T.accent}22)`,
                      border: `1.5px solid ${activeStep === i ? (i < 2 ? T.accent : T.accent2) + "66" : T.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: 22,
                      color: i < 2 ? T.accent : T.accent2,
                      transition: "all .3s",
                      transform: activeStep === i ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11,
                      color: T.subtle,
                      marginBottom: 8,
                      letterSpacing: ".1em",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      marginBottom: 10,
                      color: T.text,
                      fontFamily: "'Syne',sans-serif",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
                    {step.text}
                  </p>
                  {activeStep === i && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "20%",
                        right: "20%",
                        height: 2.5,
                        borderRadius: 99,
                        background: `linear-gradient(90deg,transparent,${i < 2 ? T.accent : T.accent2},transparent)`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── PARTNERS ── */}
          <section
            id="partners"
            className="section-outer"
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div
              className="partners-inner"
              style={{
                background: T.partnerSectionBg,
                border: `1px solid ${T.partnerSectionBorder}`,
                borderRadius: 32,
                padding: "48px",
                boxShadow: isDark ? "none" : "0 4px 32px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="partners-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 0.9fr",
                  gap: 48,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: T.accent,
                      marginBottom: 16,
                    }}
                  >
                    Hamkorlik
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "clamp(28px,4vw,48px)",
                      fontWeight: 900,
                      letterSpacing: "-.03em",
                      lineHeight: 1.1,
                      marginBottom: 20,
                      color: T.text,
                    }}
                  >
                    MilliyApp'ga qo'shiling va birgalikda o'sing
                  </h2>
                  <p
                    style={{
                      color: T.muted,
                      lineHeight: 1.8,
                      marginBottom: 32,
                      maxWidth: 440,
                    }}
                  >
                    Keng auditoriyaga chiqing, buyurtmalarni ko'paytiring va
                    zamonaviy boshqaruv vositalari bilan biznesingizni keyingi
                    bosqichga olib chiqing.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button
                      className="glow-btn"
                      style={{
                        background: isDark ? "#f1f5f9" : "#0f172a",
                        border: "none",
                        borderRadius: 16,
                        padding: "14px 28px",
                        color: isDark ? "#020508" : "#f1f5f9",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      Hamkor bo'lish
                    </button>
                    <button
                      style={{
                        background: T.btnSecBg,
                        border: `1px solid ${T.btnSecBorder}`,
                        borderRadius: 16,
                        padding: "14px 28px",
                        color: T.text,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "'DM Sans',sans-serif",
                        transition: "background .2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = T.btnSecBgHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = T.btnSecBg)
                      }
                    >
                      Demo ko'rish
                    </button>
                  </div>
                </div>

                <div
                  className="partners-cards"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  {[
                    { icon: "🍽️", text: "Restoranlar uchun buyurtma paneli" },
                    { icon: "🏪", text: "Do'konlar uchun mahsulot boshqaruvi" },
                    { icon: "🛵", text: "Courierlar uchun yo'l va tracking" },
                    {
                      icon: "🚗",
                      text: "Haydovchilar uchun daromad monitoringi",
                    },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="card-hover"
                      style={{
                        background: T.partnerCardBg,
                        backdropFilter: "blur(16px)",
                        border: `1px solid ${T.border}`,
                        borderRadius: 20,
                        padding: "20px 18px",
                        boxShadow: isDark
                          ? "none"
                          : "0 2px 10px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div style={{ fontSize: 24, marginBottom: 10 }}>
                        {item.icon}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: T.muted,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── MINI CTA ── */}
          <section
            className="section-outer"
            style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px" }}
          >
            <div
              className="cta-mini-bar"
              onClick={() => setBannerDismissed(false)}
              style={{
                background: T.ctaBg,
                border: `1px solid ${T.ctaBorder}`,
                borderRadius: 20,
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "background .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = T.ctaBgHover)
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = T.ctaBg)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 20 }}>🚀</span>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 2,
                      color: T.text,
                      fontFamily: "'Syne',sans-serif",
                    }}
                  >
                    Tez kunda G'allaorolda!
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: T.muted,
                      fontFamily: "'JetBrains Mono',monospace",
                    }}
                  >
                    {countdown.days}kun{" "}
                    {String(countdown.hours).padStart(2, "0")}:
                    {String(countdown.minutes).padStart(2, "0")}:
                    {String(countdown.seconds).padStart(2, "0")} qoldi
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.accent2 }}>
                Countdown →
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${T.footerBorder}` }}>
          <div
            className="footer-inner"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "32px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "-.02em",
                  marginBottom: 4,
                  fontFamily: "'Syne',sans-serif",
                  color: T.text,
                }}
              >
                MilliyApp
              </div>
              <div style={{ fontSize: 12, color: T.subtle }}>
                O'zbekiston uchun delivery, mobility va logistics superapp.
              </div>
            </div>
            <div
              className="footer-links"
              style={{ display: "flex", gap: 24, fontSize: 13 }}
            >
              {[
                ["#services", "Xizmatlar"],
                ["#features", "Afzalliklar"],
                ["#how", "Qanday ishlaydi"],
                ["#partners", "Hamkorlar"],
              ].map(([h, l]) => (
                <a
                  key={h}
                  href={h}
                  style={{
                    color: T.subtle,
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.subtle)}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
