"use client"
import { useState } from "react";

// Constants
const PHONE_DISPLAY = "080 6218 1764";
const PHONE_TEL = "+918062181764";
const WA_NUMBER = "918062181764";
const WA_MESSAGE = encodeURIComponent(
  "Hi, we're a group of [X] planning a trip to Valparai on [dates]. Can you send package options for cab, stay, and food?"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const TEL_LINK = `tel:${PHONE_TEL}`;

// Types
interface IncludedItem {
  title: string;
  text: string;
  d: string;
}

interface RouteStop {
  time: string;
  text: string;
}

interface RouteDay {
  label: string;
  stops: RouteStop[];
}

interface FAQ {
  q: string;
  a: string;
}

interface Colors {
  ghatGreen: string;
  teaLeaf: string;
  teaLeafLight: string;
  amber: string;
  amberDark: string;
  trustBlue: string;
  trustBlueLight: string;
  waGreen: string;
  waGreenDark: string;
  mist: string;
  earthRoad: string;
  cloud: string;
  ink: string;
  inkSoft: string;
  line: string;
}

// Data
const included: IncludedItem[] = [
  {
    title: "Private vehicle & driver",
    text: "One vehicle, one driver, for the whole trip — no switching cabs.",
    d: "M3 12h18M5 12l2-6h10l2 6M5 12v6h14v-6M7 18v2M17 18v2",
  },
  {
    title: "Stay in Valparai",
    text: "Homestay or hotel — your choice, based on your group's budget.",
    d: "M3 10l9-6 9 6v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  },
  {
    title: "All meals",
    text: "Breakfast, lunch, and dinner — covered, no add-ons.",
    d: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z M6 1v3M10 1v3M14 1v3",
  },
  {
    title: "Guided sightseeing",
    text: "Viewpoints, tea estates, waterfalls — with someone who knows the route.",
    d: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
];

const routeDays: RouteDay[] = [
  {
    label: "Day 1",
    stops: [
      { time: "8:00 AM", text: "Pickup in Coimbatore, scenic drive up the ghats." },
      { time: "En route", text: "Stop at Aliyar Dam for photos and a stretch break." },
      { time: "1:00 PM", text: "Check in to your stay, followed by lunch." },
      { time: "Afternoon", text: "Valparai viewpoint and a walk through a working tea estate." },
      { time: "Evening", text: "Dinner and overnight stay in Valparai." },
    ],
  },
  {
    label: "Day 2",
    stops: [
      { time: "Morning", text: "Breakfast, then an early waterfall and wildlife viewpoint visit." },
      { time: "Late morning", text: "Brunch, then the drive back down the ghats." },
      { time: "5:00 PM", text: "Drop-off back in Coimbatore." },
    ],
  },
];

const faqs: FAQ[] = [
  { q: "Where's the pickup point?", a: "Coimbatore, plus anywhere on the route." },
  { q: "What's the maximum group size?", a: "We handle 14 to 40+, corporate and school groups welcome." },
  { q: "Are meals included?", a: "Yes, all three meals — breakfast, lunch, and dinner." },
  { q: "Can we customize the itinerary?", a: "Every itinerary is customized before you confirm." },
  {
    q: "What's not included?",
    a: "Entry tickets to attractions, boating/safari charges, adventure activities, camera fees, personal expenses, laundry, shopping, travel insurance, and medical expenses. Also excluded: delays or costs from weather, landslides, road closures, or strikes.",
  },
  { q: "What's the cancellation policy?", a: "15 days." },
];

const COLORS: Colors = {
  ghatGreen: "#1F3D2B",
  teaLeaf: "#3F7A52",
  teaLeafLight: "#5C9A6E",
  amber: "#E8A33D",
  amberDark: "#C97F1F",
  trustBlue: "#2B5F8A",
  trustBlueLight: "#E5EEF4",
  waGreen: "#25D366",
  waGreenDark: "#1DA851",
  mist: "#E7ECE6",
  earthRoad: "#6B4A32",
  cloud: "#FAF9F4",
  ink: "#182420",
  inkSoft: "#4A564F",
  line: "#D6DDD4",
};

// Component Props Types
interface PhoneIconProps {
  size?: number;
  color?: string;
}

interface WhatsAppIconProps {
  size?: number;
  color?: string;
}

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface IncludedItemProps {
  title: string;
  text: string;
  d: string;
}

interface FaqItemProps {
  item: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

// Components
function PhoneIcon({ size = 16, color = "currentColor" }: PhoneIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 20, color = "#fff" }: WhatsAppIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.85 9.85 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.8a8.06 8.06 0 0 1 5.72 2.37 8.02 8.02 0 0 1 2.37 5.73c0 4.47-3.64 8.1-8.1 8.1a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.11.82.83-3.03-.19-.31a8.05 8.05 0 0 1-1.24-4.31c0-4.47 3.64-8.1 8.14-8.1m-4.5 4.09c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03s.87 2.35.99 2.52c.12.16 1.7 2.71 4.2 3.71 2.08.83 2.5.67 2.95.62.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.35-.76-1.84-.2-.48-.4-.42-.55-.42Z" />
    </svg>
  );
}

function CtaButton({ href, children, style }: CtaButtonProps) {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: hover ? COLORS.waGreenDark : COLORS.waGreen,
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        padding: "14px 26px",
        borderRadius: 6,
        textDecoration: "none",
        boxShadow: `0 6px 18px rgba(37,211,102,${hover ? 0.5 : 0.4})`,
        transform: hover ? "translateY(-1px)" : "none",
        transition: "all .15s ease",
        ...style,
      }}
    >
      {children}
    </a>
  );
}

function IncludedItem({ title, text, d }: IncludedItemProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        background: "#fff",
        border: `1px solid ${COLORS.line}`,
        borderLeft: `4px solid ${COLORS.teaLeaf}`,
        borderRadius: 6,
        padding: 16,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          flexShrink: 0,
          background: COLORS.trustBlueLight,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.trustBlue,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={d} />
        </svg>
      </div>
      <div>
        <strong style={{ display: "block", color: COLORS.ghatGreen, fontSize: 15.5, marginBottom: 2, fontWeight: 700 }}>
          {title}
        </strong>
        <p style={{ fontSize: 15, color: COLORS.inkSoft, fontWeight: 500, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.line}`, padding: "16px 0" }}>
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
          fontSize: 15.5,
          fontWeight: 700,
          color: COLORS.ghatGreen,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        <span>{item.q}</span>
        <span
          style={{
            marginLeft: 12,
            flexShrink: 0,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 22,
            lineHeight: 0.7,
            color: COLORS.amber,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform .2s ease",
          }}
        >
          +
        </span>
      </button>
      {isOpen && (
        <p style={{ marginTop: 10, fontSize: 14.5, color: COLORS.inkSoft, lineHeight: 1.6 }}>{item.a}</p>
      )}
    </div>
  );
}

// Main Component
export default function ValparaiGroupTours() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const wrap: React.CSSProperties = { maxWidth: 640, margin: "0 auto", padding: "0 22px" };

  return (
    <div
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        background: COLORS.cloud,
        color: COLORS.ink,
        lineHeight: 1.5,
        minHeight: "100vh",
        paddingBottom: 78,
        colorScheme: "light",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
        .nav-phone-btn { display: none; }
        @media (min-width: 480px) {
          .nav-phone-btn { display: flex !important; }
        }
        .nav-phone-btn:hover { background: rgba(255,255,255,0.1); border-color: #FAF9F4 !important; }
        .sticky-phone-btn:hover { background: #fff !important; transform: translateY(-1px); }
      `}</style>

      {/* NAV */}
      <nav style={{ background: COLORS.ghatGreen, padding: "14px 22px" }}>
        <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 19,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: COLORS.cloud,
            }}
          >
            Valparai <span style={{ color: COLORS.amber }}>Group Tours</span>
          </div>
          <a
            href={TEL_LINK}
            className="nav-phone-btn"
            style={{
              alignItems: "center",
              gap: 7,
              border: `1.5px solid ${COLORS.teaLeafLight}`,
              padding: "8px 14px",
              borderRadius: 20,
              color: COLORS.cloud,
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              transition: "background .15s ease, border-color .15s ease",
            }}
          >
            <PhoneIcon size={14} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header
        style={{
          position: "relative",
          background: `linear-gradient(180deg, ${COLORS.ghatGreen} 0%, #26492F 55%, ${COLORS.teaLeaf} 100%)`,
          color: COLORS.cloud,
          padding: "52px 0 46px",
          overflow: "hidden",
        }}
      >
        <svg
          style={{ position: "absolute", inset: 0, opacity: 0.16, pointerEvents: "none" }}
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M40,300 C120,240 20,200 100,160 C180,120 60,90 140,60 C200,35 260,45 300,10"
            stroke={COLORS.amber}
            strokeWidth="6"
            fill="none"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
        </svg>
        <div style={{ ...wrap, position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#B9D6C0",
              marginBottom: 10,
            }}
          >
            From Coimbatore to Valparai · Groups of 14 to 40 Welcome
          </div>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(34px, 8vw, 46px)",
              lineHeight: 1.05,
              color: COLORS.cloud,
              marginBottom: 16,
              marginTop: 0,
            }}
          >
            Valparai Trip, <span style={{ color: COLORS.amber }}>All Inclusive</span> — Cab + Stay + Food + Tour
          </h1>
          <p style={{ fontSize: 16, color: "#D9E4DC", maxWidth: "46ch", marginBottom: 8 }}>
            Private cab, stay, all meals and guided sightseeing for your group. One price per person covers
            everything — custom itineraries for families, friends, corporate and school groups.
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.amber,
              marginBottom: 24,
            }}
          >
            One price. Zero planning.
          </p>
          <CtaButton href={WA_LINK}>
            <WhatsAppIcon size={20} />
            Book on WhatsApp
          </CtaButton>
        </div>
      </header>

      {/* INCLUDED */}
      <section style={{ padding: "48px 0 40px" }}>
        <div style={wrap}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.teaLeaf,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span style={{ width: 18, height: 2, background: COLORS.amber, display: "inline-block" }} />
            What's Included
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 30,
              color: COLORS.ghatGreen,
              marginBottom: 22,
              marginTop: 0,
            }}
          >
            One Price, No Surprises
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {included.map((item) => (
              <IncludedItem key={item.title} {...item} />
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <IncludedItem
              title="Custom itineraries for groups"
              text="Families, friends, corporate and school groups — free itinerary, no hidden costs."
              d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
            {["Welcome drink", "Evening tea & snacks", "Fuel, toll & parking", "Driver allowance", "Vehicle taxes"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    color: COLORS.trustBlue,
                    background: COLORS.trustBlueLight,
                    padding: "6px 12px",
                    borderRadius: 20,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <p
            style={{
              fontSize: 13,
              color: COLORS.inkSoft,
              marginTop: 18,
              paddingTop: 16,
              borderTop: `1px solid ${COLORS.line}`,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: COLORS.ink, fontWeight: 700 }}>Not included:</strong> entry tickets to
            attractions, boating/safari charges, adventure activities, personal expenses, and anything outside the
            itinerary above.
          </p>
        </div>
      </section>

      {/* ROUTE */}
      <section style={{ background: COLORS.ghatGreen, color: COLORS.cloud, padding: "52px 0 46px" }}>
        <div style={wrap}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#B9D6C0",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span style={{ width: 18, height: 2, background: COLORS.amber, display: "inline-block" }} />
            The Route
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 30,
              color: COLORS.cloud,
              marginBottom: 6,
              marginTop: 0,
            }}
          >
            Two Days, One Ghat Road
          </h2>
          <p style={{ color: "#C7D6CB", fontSize: 14.5, marginBottom: 34, maxWidth: "44ch" }}>
            Every group follows the same route — the hairpin road up from the plains, a night in the hills, and
            back down before dinner.
          </p>

          <div
            style={{
              position: "relative",
              paddingLeft: 26,
              backgroundImage: "repeating-linear-gradient(180deg, #E8A33D 0 10px, transparent 10px 18px)",
              backgroundSize: "3px 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "8px 6px",
            }}
          >
            {routeDays.map((day, di) => (
              <div key={day.label}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: COLORS.amber,
                    margin: di === 0 ? "0 0 12px" : "26px 0 12px",
                  }}
                >
                  {day.label}
                </div>
                {day.stops.map((stop) => (
                  <div key={stop.time + stop.text} style={{ position: "relative", paddingBottom: 22 }}>
                    <div
                      style={{
                        position: "absolute",
                        left: -26,
                        top: 3,
                        width: 16,
                        height: 16,
                        background: COLORS.amber,
                        border: `3px solid ${COLORS.ghatGreen}`,
                        borderRadius: "50%",
                        boxShadow: `0 0 0 2px ${COLORS.amber}`,
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12.5,
                        color: COLORS.teaLeafLight,
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      {stop.time}
                    </div>
                    <div style={{ fontSize: 15, color: "#E7EEE8" }}>{stop.text}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "50px 0 44px" }}>
        <div style={wrap}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.teaLeaf,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span style={{ width: 18, height: 2, background: COLORS.amber, display: "inline-block" }} />
            Pricing
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 30,
              color: COLORS.ghatGreen,
              marginBottom: 6,
              marginTop: 0,
            }}
          >
            Group Rates
          </h2>
          <p style={{ color: COLORS.inkSoft, fontSize: 14.5, marginBottom: 26 }}>
            Per person, all-inclusive — vehicle, stay, meals, and sightseeing.
          </p>

          <div style={{ background: COLORS.mist, borderRadius: 10, padding: "26px 24px", textAlign: "center", marginBottom: 16 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.teaLeaf,
                marginBottom: 6,
              }}
            >
              Starting from
            </div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 44, color: COLORS.ghatGreen }}>
              ₹2,950 <span style={{ fontSize: 17, fontWeight: 600, color: COLORS.inkSoft }}>/ person</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
            {[
              { label: "1 Night / 2 Days", price: "₹2,950", meals: "3 meals included" },
              { label: "2 Nights / 3 Days", price: "₹4,950", meals: "6 meals included" },
            ].map((tier) => (
              <div
                key={tier.label}
                style={{ background: "#fff", border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "16px 14px", textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    color: COLORS.inkSoft,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  {tier.label}
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, color: COLORS.trustBlue }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: 12, color: COLORS.inkSoft, marginTop: 4 }}>{tier.meals}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13.5, color: COLORS.inkSoft, textAlign: "center", fontStyle: "italic", margin: 0 }}>
            Message us on WhatsApp for the exact quote for your group.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px 18px",
              marginTop: 16,
              paddingTop: 16,
              borderTop: `1px solid ${COLORS.line}`,
            }}
          >
            {["No hidden costs", "Free customization", "15-day cancellation"].map((t) => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.trustBlue, fontWeight: 600 }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding: "8px 0 44px" }}>
        <div style={wrap}>
          <div
            style={{
              background: "#fff",
              borderLeft: `4px solid ${COLORS.amber}`,
              borderRadius: 6,
              padding: 22,
              boxShadow: "0 2px 10px rgba(31,61,43,0.06)",
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 44,
                color: COLORS.amber,
                lineHeight: 0.5,
                display: "block",
                marginBottom: 10,
              }}
            >
              &ldquo;
            </span>
            <p style={{ fontSize: 16, color: COLORS.ink, fontWeight: 500, marginBottom: 12, marginTop: 0 }}>
              Everything was handled — cab, food, stay, even the photo stops. We just enjoyed.
            </p>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: COLORS.teaLeaf }}>
              [Group size]-group from [City] · [Name], [Month/Year]
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "8px 0 56px" }}>
        <div style={wrap}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.teaLeaf,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span style={{ width: 18, height: 2, background: COLORS.amber, display: "inline-block" }} />
            FAQ
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 30,
              color: COLORS.ghatGreen,
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            Good to Know
          </h2>

          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.earthRoad, color: "#EFE6DE", padding: "26px 0", textAlign: "center", fontSize: 13 }}>
        <div style={{ ...wrap, opacity: 0.85 }}>
          Full-Service Group Tours · From Coimbatore to Valparai · Cab + Stay + Food + Tour
        </div>
      </footer>

      {/* STICKY BOTTOM BAR */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          background: COLORS.ghatGreen,
          borderTop: `2px solid ${COLORS.amber}`,
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <a
          href={TEL_LINK}
          className="sticky-phone-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: COLORS.cloud,
            color: COLORS.ghatGreen,
            textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 700,
            padding: "11px 16px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            transition: "background .15s ease, transform .15s ease",
          }}
        >
          <PhoneIcon size={16} color={COLORS.amberDark} />
          {PHONE_DISPLAY}
        </a>
        <CtaButton href={WA_LINK} style={{ padding: "11px 20px", fontSize: 14.5 }}>
          <WhatsAppIcon size={18} />
          WhatsApp
        </CtaButton>
      </div>
    </div>
  );
}