"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-block px-3 py-1 bg-brand-purple/10 border border-brand-purple/30 text-brand-purple-light text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
