"use client";
import { motion } from "framer-motion";


const partners = [
  { category: "Events Partner", name: "RedTeam Hacker Academy", logo: "/logo/Rdteamlogo.jpeg" },
  { category: "Rewards Sponsor", name: "NERDS LAB", logo: "/logo/nerdlabs.png" },
  { category: "Community Sponsor", name: "Loopfound", logo: "/logo/loopfound%20logo.jpg" },
];

const previousSponsors = [
  "A2B", "Bank of Baroda", "Canara Bank", "Cigniti",
  "CodeChef", "Contentstack", "Chennai Super", "Cyient",
  "Devfolio", "Green Trends", "HDFC Bank", "Indian Bank",
  "IOB", "ICICI", "JioStar", "KLA", "LIC", "MoneyControl",
  "Nippon Paint", "Oracle", "PayTM", "SBI", "Slice",
  "Swiggy", "TCS", "Titan", "TVS", "Wipro",
];

export default function Sponsors() {
  return (
    <section id="sponsors" style={{
      position: "relative", zIndex: 1, padding: "6rem 2rem",
    }}>
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "1rem" }}
      >
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          letterSpacing: "0.05em",
        }}>
          <span className="heading-gradient">OUR</span>{" "}
          <span style={{ color: "var(--color-cream)" }}>SPONSORS</span>
        </h2>
        <p style={{
          fontFamily: "var(--font-decorative)",
          fontSize: "1.1rem",
          color: "var(--color-text-muted)",
          letterSpacing: "0.1em",
          marginTop: "0.5rem",
        }}>
          Proudly supported by industry leaders
        </p>
      </motion.div>

      {/* Partners Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        style={{
          maxWidth: 1100, margin: "3rem auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {partners.map((p) => (
          <motion.div key={p.name} variants={{
            hidden: { opacity: 0, y: 10, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
          }}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <div style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: 8,
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "150px",
              minHeight: "80px",
            }}>
              {p.logo ? (
                <img 
                  src={p.logo} 
                  alt={`${p.name} logo`}
                  width={120}
                  height={70}
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <span style={{
                  fontFamily: "var(--font-heading)", 
                  fontSize: "1.2rem",
                  fontWeight: 700, 
                  color: "#333",
                }}>
                  {p.name}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      </section>
    );
}
