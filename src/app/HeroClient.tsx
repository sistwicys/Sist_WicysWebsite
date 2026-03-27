"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default function HeroClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 160 }, () => {
      const r = Math.random();
      return {
        x: Math.random(),
        y: Math.random(),
        size: 0.4 + Math.random() * 1.3,
        cycleLen: 180 + Math.floor(Math.random() * 320),
        offset: Math.floor(Math.random() * 500),
        peak: 0.3 + Math.random() * 0.55,
        color: r > 0.88
          ? "rgba(167,139,250,"
          : r > 0.76
            ? "rgba(147,197,253,"
            : "rgba(255,255,255,",
      };
    });

    let t = 0;
    let raf: number;

    const easeInOut = (x: number) =>
      x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;
      stars.forEach((s) => {
        const pos = ((t + s.offset) % s.cycleLen) / s.cycleLen;
        let opacity = 0;
        if (pos < 0.2) {
          opacity = s.peak * easeInOut(pos / 0.2);
        } else if (pos < 0.65) {
          opacity = s.peak * (0.85 + 0.15 * Math.sin(t * 0.08 + s.offset));
        } else if (pos < 0.85) {
          opacity = s.peak * easeInOut(1 - (pos - 0.65) / 0.2);
        }
        if (opacity < 0.01) return;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + opacity.toFixed(3) + ")";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        background: "#05070f",
        paddingTop: "7rem",
        paddingBottom: "5rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      {/* Stars */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Background blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 55% at 50% -5%, rgba(124,92,252,0.2) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 35% at 20% 70%, rgba(79,142,247,0.08) 0%, transparent 55%)",
            "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(124,92,252,0.07) 0%, transparent 55%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none cyber-grid-bg"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full mx-auto">



          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Image
              src="/wicys-logo-new.png"
              alt="WiCyS – Women in CyberSecurity"
              width={480}
              height={280} /* Maintaining 480x280 aspect ratio (~1.71:1) */
              style={{ maxWidth: "100%", objectFit: "contain" }}
            />
          </div>

        {/* Chapter line */}
        <p
          className="mb-6"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "rgba(107,114,128,0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Sathyabama Institute of Science and Technology · Chennai
        </p>

        {/* Heading — normal weight, no distortion */}
        <h1
          className="mb-5 text-white"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Empowering Women in{" "}
          <span className="gradient-text">Cybersecurity</span>
        </h1>

        {/* WiCyS tagline — italic quote */}
        <div
          className="mx-auto mb-8 text-left"
          style={{
            maxWidth: 520,
            padding: "1rem 1.5rem",
            borderLeft: "2px solid rgba(167,139,250,0.25)",
          }}
        >
          <p
            style={{
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "13.5px",
              lineHeight: 1.75,
              color: "#8b93a8",
            }}
          >
            &quot;A community of women, men, allies, and advocates that support the
            WiCyS mission to recruit, retain and advance women in cybersecurity
            as part of a workforce solution.&quot;
            <span
              style={{
                display: "block",
                marginTop: "0.5rem",
                fontStyle: "italic",
                fontSize: "12px",
                color: "rgba(167,139,250,0.5)",
              }}
            >
              ~ WiCyS
            </span>
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-12">
          <Link href="/upcoming" className="btn-primary">
            View Upcoming Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats pill */}
        <div
          className="flex mx-auto"
          style={{
            maxWidth: 480,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {[
            { val: "50+", label: "Members" },
            { val: "10+", label: "Events Hosted" },
            { val: "2+", label: "Industry Partners" },
            { val: "5+", label: "Upcoming" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex-1 text-center py-4"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: 6,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-12"
          style={{ fontSize: "10px", color: "rgba(107,114,128,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          ↓ scroll to explore
        </p>
      </div>
    </section>
  );
}
