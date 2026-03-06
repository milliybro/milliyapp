"use client";
import { useEffect, useRef, useState } from "react";

// ─── Countdown hook ───────────────────────────────────────────────
function useCountdown(targetDate: any) {
  const calc = () => {
    const diff = new Date(targetDate) - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ─── Animated number ─────────────────────────────────────────────
function Digit({ val }: { val: number }) {
  return (
    <span
      key={val}
      style={{
        display: "inline-block",
        animation: "flipIn .35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {String(val).padStart(2, "0")}
    </span>
  );
}

// ─── Floating particle ───────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.1,
  }));
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
            background: `rgba(${p.id % 3 === 0 ? "34,211,238" : p.id % 3 === 1 ? "251,146,60" : "99,179,237"},${p.opacity})`,
            animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────
export default function MilliyApp() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  // Launch date: 60 days from now
  const launchDate = new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();
  const countdown = useCountdown(launchDate);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          setVisibleSections((prev) => ({
            ...prev,
            [e.target.id]: e.isIntersecting,
          })),
        ),
      { threshold: 0.12 },
    );
    Object.values(sectionRefs.current).forEach(
      (el: any) => el && obs.observe(el),
    );
    return () => obs.disconnect();
  }, []);

  const ref = (id: any) => (el: any) => {
    sectionRefs.current[id] = el;
  };

  const services = [
    {
      icon: "🍔",
      title: "Food Delivery",
      color: "#fb923c",
      glow: "rgba(251,146,60,0.25)",
      desc: "Sevimli taomlaringizni tezkor yetkazib berish — zamonaviy restoranlar va kafelar bilan.",
      tags: ["30 min", "200+ restoran", "Real-time"],
    },
    {
      icon: "🛒",
      title: "Market Delivery",
      color: "#34d399",
      glow: "rgba(52,211,153,0.25)",
      desc: "Do'konlardan kundalik mahsulotlarni uy yoki ofisgacha yetkazish xizmati.",
      tags: ["1 soat", "500+ mahsulot", "Fresco"],
    },
    {
      icon: "🚖",
      title: "Taxi",
      color: "#22d3ee",
      glow: "rgba(34,211,238,0.25)",
      desc: "Shahar bo'ylab qulay, xavfsiz va tezkor harakatlanish uchun aqlli transport yechimi.",
      tags: ["5 min", "Xavfsiz", "Arzon"],
    },
    {
      icon: "📦",
      title: "Cargo & Courier",
      color: "#a78bfa",
      glow: "rgba(167,139,250,0.25)",
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
    },
    {
      icon: "◎",
      title: "Real vaqt kuzatuvi",
      desc: "Buyurtma holati, courier harakati va yetib kelish vaqtini interaktiv kuzatish.",
    },
    {
      icon: "◌",
      title: "Hamkorlar uchun o'sish",
      desc: "Restoran, do'kon va haydovchilar uchun ko'proq buyurtma va qulay boshqaruv.",
    },
    {
      icon: "✦",
      title: "Tez va ishonchli logistika",
      desc: "Optimallashtirilgan yetkazib berish yo'llari va kuchli operatsion tizim.",
    },
  ];

  const stats = [
    { value: "24/7", label: "Doimiy xizmat" },
    { value: "5+", label: "Xizmat yo'nalishi" },
    { value: "10x", label: "Hamkorlar uchun o'sish" },
    { value: "<30", label: "Daqiqada yetkazib berish" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #060912;
      --surface: rgba(255,255,255,0.04);
      --border: rgba(255,255,255,0.08);
      --cyan: #22d3ee;
      --orange: #fb923c;
      --blue: #3b82f6;
      --text: #f1f5f9;
      --muted: #64748b;
    }

    body { background: var(--bg); color: var(--text); font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
    html { scroll-behavior: smooth; }

    @keyframes flipIn {
      from { transform: translateY(-12px); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0) scale(1); }
      50%      { transform: translateY(-28px) scale(1.1); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: .6; }
      100% { transform: scale(2.4); opacity: 0;  }
    }
    @keyframes scan {
      0%   { top: 0; }
      100% { top: 100%; }
    }
    @keyframes slideUp {
      from { transform: translateY(40px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes glitch1 {
      0%,100% { clip-path: inset(0 0 95% 0); transform: translate(-2px,0); }
      20%      { clip-path: inset(30% 0 60% 0); transform: translate(2px,0); }
      40%      { clip-path: inset(60% 0 30% 0); transform: translate(-1px,0); }
      60%      { clip-path: inset(10% 0 80% 0); transform: translate(1px,0); }
      80%      { clip-path: inset(80% 0 10% 0); transform: translate(-2px,0); }
    }
    @keyframes glitch2 {
      0%,100% { clip-path: inset(50% 0 40% 0); transform: translate(2px,0); }
      25%      { clip-path: inset(20% 0 70% 0); transform: translate(-2px,0); }
      50%      { clip-path: inset(70% 0 20% 0); transform: translate(1px,0); }
      75%      { clip-path: inset(5% 0 90% 0); transform: translate(-1px,0); }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes borderRotate {
      to { --angle: 360deg; }
    }

    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
    }
    .reveal.visible {
      opacity: 1;
      transform: none;
    }
    .reveal:nth-child(2) { transition-delay: .1s; }
    .reveal:nth-child(3) { transition-delay: .18s; }
    .reveal:nth-child(4) { transition-delay: .26s; }

    .glow-btn {
      position: relative;
      overflow: hidden;
      transition: transform .2s, box-shadow .2s;
    }
    .glow-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 48px rgba(34,211,238,.3);
    }
    .glow-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.15) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: transform .4s;
    }
    .glow-btn:hover::after { transform: translateX(100%); }

    .card-hover {
      transition: transform .3s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .3s;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 64px rgba(0,0,0,.4);
    }

    .ticker-wrap { overflow: hidden; white-space: nowrap; }
    .ticker-inner { display: inline-flex; animation: marquee 28s linear infinite; }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(34,211,238,.3); border-radius: 99px; }
  `;

  // ── COMING SOON BANNER ──────────────────────────────────────────
  if (!bannerDismissed) {
    return (
      <>
        <style>{css}</style>
        <div
          style={{
            minHeight: "100vh",
            background: "#020508",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <Particles />

          {/* Grid bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(34,211,238,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glows */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(34,211,238,.08), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "15%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(251,146,60,.08), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Scan line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(34,211,238,.6), transparent)",
              animation: "scan 4s linear infinite",
              zIndex: 1,
            }}
          />

          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 40,
              animation: "slideUp .8s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, #3b82f6, #22d3ee, #fb923c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 32px rgba(34,211,238,.4)",
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 900, color: "#020508" }}>
                M
              </span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: "-.02em",
                  color: "#f1f5f9",
                }}
              >
                MilliyApp
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#22d3ee",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                }}
              >
                Delivery · Mobility · Logistics
              </div>
            </div>
          </div>

          {/* Main headline */}
          <div
            style={{
              textAlign: "center",
              animation: "slideUp .9s .1s cubic-bezier(.22,1,.36,1) both",
              zIndex: 2,
              padding: "0 24px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(251,146,60,.3)",
                background: "rgba(251,146,60,.08)",
                borderRadius: 99,
                padding: "8px 20px",
                fontSize: 13,
                color: "#fb923c",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: 28,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#fb923c",
                  display: "inline-block",
                  boxShadow: "0 0 8px #fb923c",
                  animation: "pulse-ring 1.5s ease-out infinite",
                }}
              />
              Yangi xizmat tez orada
            </div>

            {/* Glitch title */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <h1
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px, 12vw, 120px)",
                  letterSpacing: ".04em",
                  lineHeight: 1,
                  background:
                    "linear-gradient(135deg, #f1f5f9 30%, #22d3ee 60%, #fb923c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 8,
                }}
              >
                TEZ KUNDA
              </h1>
              {/* glitch layers */}
              <h1
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px, 12vw, 120px)",
                  letterSpacing: ".04em",
                  lineHeight: 1,
                  color: "#22d3ee",
                  opacity: 0.6,
                  animation: "glitch1 5s infinite",
                }}
              >
                TEZ KUNDA
              </h1>
              <h1
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px, 12vw, 120px)",
                  letterSpacing: ".04em",
                  lineHeight: 1,
                  color: "#fb923c",
                  opacity: 0.5,
                  animation: "glitch2 5s .3s infinite",
                }}
              >
                TEZ KUNDA
              </h1>
            </div>

            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 8vw, 80px)",
                letterSpacing: ".08em",
                color: "#22d3ee",
                textShadow:
                  "0 0 60px rgba(34,211,238,.5), 0 0 120px rgba(34,211,238,.2)",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              G'ALLAOROLDA
            </div>

            <div
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                color: "#94a3b8",
                maxWidth: 520,
                margin: "0 auto 44px",
                lineHeight: 1.7,
              }}
            >
              O'zbekistonning eng zamonaviy superapp platformasi — food
              delivery, taxi, market va cargo xizmatlari bitta ilovada.
            </div>
          </div>

          {/* Countdown */}
          <div
            style={{
              animation: "slideUp 1s .2s cubic-bezier(.22,1,.36,1) both",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
                padding: "0 24px",
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(34,211,238,.2)",
                    borderRadius: 20,
                    padding: "20px 28px",
                    backdropFilter: "blur(16px)",
                    minWidth: 88,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "clamp(28px, 5vw, 44px)",
                      fontWeight: 700,
                      color: i === 3 ? "#fb923c" : "#22d3ee",
                      textShadow: `0 0 24px ${i === 3 ? "rgba(251,146,60,.6)" : "rgba(34,211,238,.6)"}`,
                      lineHeight: 1,
                    }}
                  >
                    <Digit val={v} />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#475569",
                      letterSpacing: ".15em",
                      fontWeight: 600,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email signup */}
          <div
            style={{
              marginTop: 48,
              animation: "slideUp 1s .35s cubic-bezier(.22,1,.36,1) both",
              zIndex: 2,
              padding: "0 24px",
              width: "100%",
              maxWidth: 480,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 20,
                padding: "6px 6px 6px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="email"
                placeholder="Email manzilingizni kiriting..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f1f5f9",
                  fontSize: 14,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              />
              <button
                className="glow-btn"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
                  border: "none",
                  borderRadius: 14,
                  padding: "11px 22px",
                  color: "#020508",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: ".03em",
                }}
              >
                Xabar olish
              </button>
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#334155",
                marginTop: 12,
              }}
            >
              Ishga tushganda birinchilar qatorida xabar oling. Spam yo'q.
            </p>
          </div>

          {/* CTA to see full page */}
          <button
            onClick={() => setBannerDismissed(true)}
            style={{
              marginTop: 44,
              animation: "slideUp 1s .45s cubic-bezier(.22,1,.36,1) both",
              background: "transparent",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 99,
              padding: "12px 32px",
              color: "#94a3b8",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "color .2s, border-color .2s",
              zIndex: 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f1f5f9";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#94a3b8";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.15)";
            }}
          >
            Platforma haqida ko'proq
            <span style={{ fontSize: 16 }}>↓</span>
          </button>

          {/* Ticker bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: "1px solid rgba(255,255,255,.06)",
              padding: "12px 0",
              background: "rgba(255,255,255,.02)",
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
                        color: "#334155",
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

  // ── FULL LANDING PAGE ───────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          color: "var(--text)",
          overflowX: "hidden",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: `
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(59,130,246,.18), transparent),
            radial-gradient(ellipse 60% 40% at 80% 5%, rgba(34,211,238,.12), transparent),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(251,146,60,.08), transparent)
          `,
          }}
        />
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.4,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            borderBottom: "1px solid rgba(255,255,255,.07)",
            backdropFilter: "blur(24px)",
            background: scrollY > 50 ? "rgba(6,9,18,.85)" : "transparent",
            transition: "background .3s",
          }}
        >
          <div
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
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, #3b82f6, #22d3ee, #fb923c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 24px rgba(34,211,238,.3)",
                }}
              >
                <span
                  style={{ fontSize: 18, fontWeight: 900, color: "#020508" }}
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
                  }}
                >
                  MilliyApp
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#22d3ee",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                  }}
                >
                  Delivery · Mobility
                </div>
              </div>
            </div>

            <nav
              style={{
                display: "flex",
                gap: 32,
                fontSize: 14,
                color: "#94a3b8",
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
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#f1f5f9")}
                  onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 99,
                  padding: "9px 20px",
                  color: "#cbd5e1",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: "border-color .2s, background .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.28)";
                  e.currentTarget.style.background = "rgba(255,255,255,.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.12)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Kirish
              </button>
              <button
                className="glow-btn"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
                  border: "none",
                  borderRadius: 99,
                  padding: "9px 22px",
                  color: "#020508",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Boshlash
              </button>
            </div>
          </div>
        </header>

        <main style={{ position: "relative", zIndex: 1 }}>
          {/* ── HERO ── */}
          <section
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "80px 32px 60px",
            }}
          >
            {/* Coming soon badge */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div
                onClick={() => setBannerDismissed(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid rgba(251,146,60,.35)",
                  background: "rgba(251,146,60,.08)",
                  borderRadius: 99,
                  padding: "8px 20px",
                  fontSize: 13,
                  color: "#fb923c",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(251,146,60,.14)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(251,146,60,.08)")
                }
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#fb923c",
                    boxShadow: "0 0 10px #fb923c",
                    display: "inline-block",
                    animation: "pulse-ring 1.5s ease-out infinite",
                  }}
                />
                Tez kunda G'allaorolda ishga tushadi
                <span>→</span>
              </div>
            </div>

            <div
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
                    fontSize: "clamp(44px, 6vw, 80px)",
                    fontWeight: 900,
                    letterSpacing: "-.04em",
                    lineHeight: 1.05,
                    marginBottom: 24,
                  }}
                >
                  Yetkazib berishning{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #22d3ee 50%, #fb923c 100%)",
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
                    color: "#94a3b8",
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
                      background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
                      border: "none",
                      borderRadius: 16,
                      padding: "15px 32px",
                      color: "#020508",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Ilovani sinab ko'rish
                  </button>
                  <button
                    style={{
                      background: "rgba(255,255,255,.05)",
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: 16,
                      padding: "15px 32px",
                      color: "#f1f5f9",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      transition: "background .2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,.09)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,.05)")
                    }
                  >
                    Hamkor bo'lish
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 12,
                  }}
                >
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: 16,
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 22,
                          fontWeight: 900,
                          color: "#22d3ee",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#475569", marginTop: 4 }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero card */}
              <div style={{ position: "relative" }}>
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
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.09)",
                    borderRadius: 28,
                    padding: 20,
                    backdropFilter: "blur(24px)",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.07)",
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
                        <div style={{ fontSize: 12, color: "#475569" }}>
                          Live Operations
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>
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
                        border: "1px solid rgba(255,255,255,.07)",
                        background:
                          "linear-gradient(180deg, rgba(6,9,18,.95), rgba(15,23,42,.7))",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          opacity: 0.2,
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />

                      {/* Route line */}
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
                            <stop offset="0%" stopColor="#fb923c" />
                            <stop offset="50%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#3b82f6" />
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

                      {/* Nodes */}
                      {[
                        { x: "15%", y: "22%", c: "#fb923c", label: "Pickup" },
                        { x: "55%", y: "25%", c: "#22d3ee", label: "En route" },
                        { x: "84%", y: "65%", c: "#3b82f6", label: "Delivery" },
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
                                animation: "pulse-ring 2s ease-out infinite",
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

                      {/* Info card */}
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "rgba(6,9,18,.85)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,.1)",
                          borderRadius: 14,
                          padding: "10px 14px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: "#475569",
                            marginBottom: 3,
                          }}
                        >
                          Aktiv buyurtma
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>
                          Toshkent City → Chilonzor
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#22d3ee",
                            marginTop: 4,
                          }}
                        >
                          ETA: 12 min
                        </div>
                      </div>

                      {/* Progress */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          background: "rgba(6,9,18,.88)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,.1)",
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
                          <span style={{ fontSize: 12, fontWeight: 600 }}>
                            Courier status
                          </span>
                          <span style={{ fontSize: 11, color: "#34d399" }}>
                            Yo'lda
                          </span>
                        </div>
                        <div
                          style={{
                            height: 6,
                            background: "rgba(255,255,255,.08)",
                            borderRadius: 99,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: "73%",
                              background:
                                "linear-gradient(90deg, #3b82f6, #22d3ee)",
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
                            color: "#475569",
                          }}
                        >
                          <span>Pickup</span>
                          <span>Delivery</span>
                        </div>
                      </div>
                    </div>

                    {/* Service chips */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        gap: 8,
                        marginTop: 12,
                      }}
                    >
                      {["🍔 Food", "🛒 Market", "🚖 Taxi", "📦 Cargo"].map(
                        (s) => (
                          <div
                            key={s}
                            style={{
                              background: "rgba(255,255,255,.04)",
                              border: "1px solid rgba(255,255,255,.08)",
                              borderRadius: 12,
                              padding: "10px 4px",
                              textAlign: "center",
                              fontSize: 12,
                              color: "#94a3b8",
                              cursor: "pointer",
                              transition: "background .2s, border-color .2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(34,211,238,.08)";
                              e.currentTarget.style.borderColor =
                                "rgba(34,211,238,.25)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,.04)";
                              e.currentTarget.style.borderColor =
                                "rgba(255,255,255,.08)";
                            }}
                          >
                            {s}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── TICKER ── */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,.05)",
              borderBottom: "1px solid rgba(255,255,255,.05)",
              padding: "14px 0",
              margin: "20px 0",
              background: "rgba(255,255,255,.02)",
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
                        color: "#334155",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        paddingRight: 48,
                      }}
                    >
                      Food Delivery · Market · Taxi · Cargo &amp; Courier ·
                      Real-time Tracking · G'allaorol · MilliyApp ·
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* ── SERVICES ── */}
          <section
            id="services"
            ref={ref("services")}
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div style={{ marginBottom: 48 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#22d3ee",
                  marginBottom: 12,
                }}
              >
                Xizmatlar
              </div>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 900,
                  letterSpacing: "-.03em",
                  maxWidth: 500,
                }}
              >
                Bitta platforma,
                <br />
                ko'p imkoniyat
              </h2>
            </div>

            {/* Tabs */}
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
                        ? "rgba(34,211,238,.12)"
                        : "rgba(255,255,255,.04)",
                    border: `1px solid ${activeTab === i ? "rgba(34,211,238,.35)" : "rgba(255,255,255,.08)"}`,
                    borderRadius: 99,
                    padding: "9px 20px",
                    color: activeTab === i ? "#22d3ee" : "#64748b",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    transition: "all .25s",
                  }}
                >
                  {s.icon} {s.title}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
              }}
            >
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className="card-hover"
                  onClick={() => setActiveTab(i)}
                  style={{
                    background:
                      activeTab === i
                        ? `rgba(${service.color === "#fb923c" ? "251,146,60" : service.color === "#34d399" ? "52,211,153" : service.color === "#22d3ee" ? "34,211,238" : "167,139,250"},.07)`
                        : "rgba(255,255,255,.04)",
                    border: `1px solid ${activeTab === i ? service.glow.replace("0.25", "0.4") : "rgba(255,255,255,.08)"}`,
                    borderRadius: 24,
                    padding: 24,
                    cursor: "pointer",
                    boxShadow:
                      activeTab === i ? `0 0 40px ${service.glow}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: `linear-gradient(135deg, ${service.glow}, rgba(255,255,255,.04))`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      marginBottom: 20,
                      border: `1px solid rgba(255,255,255,.08)`,
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#64748b",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    {service.desc}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {service.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: "rgba(255,255,255,.05)",
                          border: "1px solid rgba(255,255,255,.08)",
                          borderRadius: 99,
                          padding: "3px 10px",
                          fontSize: 11,
                          color: "#94a3b8",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 13,
                      fontWeight: 600,
                      color: service.color,
                    }}
                  >
                    Batafsil →
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES ── */}
          <section
            id="features"
            ref={ref("features")}
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,.1), rgba(34,211,238,.08))",
                  border: "1px solid rgba(59,130,246,.2)",
                  borderRadius: 28,
                  padding: 36,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "#3b82f6",
                    marginBottom: 16,
                  }}
                >
                  Afzalliklar
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 4vw, 44px)",
                    fontWeight: 900,
                    letterSpacing: "-.03em",
                    lineHeight: 1.1,
                    marginBottom: 20,
                  }}
                >
                  Professional.
                  <br />
                  Interaktiv.
                  <br />
                  Ishonchli.
                </h2>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: 1.8,
                    marginBottom: 28,
                  }}
                >
                  MilliyApp nafaqat buyurtma ilovasi, balki logistika va mobil
                  xizmatlarni boshqaruvchi kuchli raqamli platforma.
                </p>

                {/* Performance widget */}
                <div
                  style={{
                    background: "rgba(6,9,18,.7)",
                    borderRadius: 20,
                    padding: 20,
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
                          color: "#475569",
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
                          color: "#22d3ee",
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
                    { label: "Delivery flow", val: 92, c: "#f1f5f9" },
                    { label: "Tracking system", val: 96, c: "#22d3ee" },
                    { label: "Payment gateway", val: 99, c: "#34d399" },
                  ].map(({ label, val, c }) => (
                    <div key={label} style={{ marginBottom: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 12,
                          color: "#475569",
                          marginBottom: 6,
                        }}
                      >
                        <span>{label}</span>
                        <span>{val}%</span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          background: "rgba(255,255,255,.06)",
                          borderRadius: 99,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${val}%`,
                            background: `linear-gradient(90deg, rgba(59,130,246,.6), ${c})`,
                            borderRadius: 99,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
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
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: 24,
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: "rgba(34,211,238,.1)",
                        border: "1px solid rgba(34,211,238,.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        color: "#22d3ee",
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
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#475569",
                        lineHeight: 1.7,
                      }}
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
            ref={ref("how")}
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#fb923c",
                  marginBottom: 12,
                }}
              >
                Qanday ishlaydi
              </div>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 900,
                  letterSpacing: "-.03em",
                }}
              >
                4 ta oddiy bosqich
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
                position: "relative",
              }}
            >
              {/* Connector line */}
              <div
                style={{
                  position: "absolute",
                  top: 48,
                  left: "12.5%",
                  right: "12.5%",
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(34,211,238,.3), rgba(251,146,60,.3), transparent)",
                }}
              />

              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="card-hover"
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 24,
                    padding: "28px 24px",
                    position: "relative",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background:
                        i < 2
                          ? "linear-gradient(135deg, rgba(59,130,246,.2), rgba(34,211,238,.2))"
                          : "linear-gradient(135deg, rgba(251,146,60,.2), rgba(34,211,238,.1))",
                      border: `1px solid ${i < 2 ? "rgba(34,211,238,.3)" : "rgba(251,146,60,.3)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: 22,
                      color: i < 2 ? "#22d3ee" : "#fb923c",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11,
                      color: "#334155",
                      marginBottom: 8,
                      letterSpacing: ".1em",
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}
                  >
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── PARTNERS ── */}
          <section
            id="partners"
            ref={ref("partners")}
            style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px" }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,.08), rgba(34,211,238,.07), rgba(251,146,60,.07))",
                border: "1px solid rgba(255,255,255,.09)",
                borderRadius: 32,
                padding: "48px",
              }}
            >
              <div
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
                      color: "#22d3ee",
                      marginBottom: 16,
                    }}
                  >
                    Hamkorlik
                  </div>
                  <h2
                    style={{
                      fontSize: "clamp(28px, 4vw, 48px)",
                      fontWeight: 900,
                      letterSpacing: "-.03em",
                      lineHeight: 1.1,
                      marginBottom: 20,
                    }}
                  >
                    MilliyApp'ga qo'shiling va birgalikda o'sing
                  </h2>
                  <p
                    style={{
                      color: "#64748b",
                      lineHeight: 1.8,
                      marginBottom: 32,
                      maxWidth: 440,
                    }}
                  >
                    Keng auditoriyaga chiqing, buyurtmalarni ko'paytiring va
                    zamonaviy boshqaruv vositalari bilan biznesingizni keyingi
                    bosqichga olib chiqing.
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      className="glow-btn"
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: 16,
                        padding: "14px 28px",
                        color: "#020508",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      Hamkor bo'lish
                    </button>
                    <button
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid rgba(255,255,255,.12)",
                        borderRadius: 16,
                        padding: "14px 28px",
                        color: "#f1f5f9",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "'Space Grotesk', sans-serif",
                        transition: "background .2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,.06)")
                      }
                    >
                      Demo ko'rish
                    </button>
                  </div>
                </div>

                <div
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
                        background: "rgba(6,9,18,.6)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: 20,
                        padding: "20px 18px",
                      }}
                    >
                      <div style={{ fontSize: 24, marginBottom: 10 }}>
                        {item.icon}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#94a3b8",
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

          {/* ── MINI CTA BANNER ── */}
          <section
            style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px" }}
          >
            <div
              onClick={() => setBannerDismissed(false)}
              style={{
                background: "rgba(251,146,60,.06)",
                border: "1px solid rgba(251,146,60,.2)",
                borderRadius: 20,
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "background .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(251,146,60,.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(251,146,60,.06)")
              }
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 20 }}>🚀</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>
                    Tez kunda G'allaorolda!
                  </div>
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>
                    {countdown.days} kun {countdown.hours} soat{" "}
                    {countdown.minutes} daqiqa qoldi
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fb923c" }}>
                Countdown →{" "}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <div
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
                }}
              >
                MilliyApp
              </div>
              <div style={{ fontSize: 12, color: "#334155" }}>
                O'zbekiston uchun delivery, mobility va logistics superapp.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 24,
                fontSize: 13,
                color: "#334155",
              }}
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
                    color: "#334155",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#f1f5f9")}
                  onMouseLeave={(e) => (e.target.style.color = "#334155")}
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
