"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({ targetDate, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className={`flex items-center gap-3 sm:gap-6 ${className}`}>
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3 sm:gap-6">
          <div className="text-center">
            <div className="bg-dark-600 border border-brand-purple/30 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[90px]">
              <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-gray-500 text-xs sm:text-sm mt-2 block uppercase tracking-wider">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-brand-purple-light text-2xl font-bold mb-5">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function MagicalCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Moons", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-6 flex-wrap">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-6">
          <div className="text-center">
            <div
              className="rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[90px] border"
              style={{
                background: "rgba(20,15,5,0.8)",
                borderColor: "rgba(251,191,36,0.3)",
                boxShadow: "0 0 20px rgba(251,191,36,0.1)",
              }}
            >
              <span
                className="text-3xl sm:text-4xl font-bold tabular-nums"
                style={{ color: "#fbbf24", textShadow: "0 0 15px rgba(251,191,36,0.6)" }}
              >
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs sm:text-sm mt-2 block uppercase tracking-wider" style={{ color: "#92400e" }}>
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className="text-2xl font-bold mb-5"
              style={{ color: "#fbbf24", textShadow: "0 0 10px rgba(251,191,36,0.5)" }}
            >
              ✦
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
