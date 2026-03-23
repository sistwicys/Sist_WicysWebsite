"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EventCardProps {
  title: string;
  category: string;
  date: string;
  description: string;
  index?: number;
  highlight?: boolean;
}

const categoryColors: Record<string, string> = {
  workshop: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  lecture: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  hackathon: "text-green-400 bg-green-400/10 border-green-400/30",
  technical: "text-orange-400 bg-orange-400/10 border-orange-400/30",
};

const categoryIcons: Record<string, string> = {
  workshop: "🔧",
  lecture: "🎤",
  hackathon: "💻",
  technical: "⚙️",
};

export function EventCard({
  title,
  category,
  date,
  description,
  index = 0,
  highlight = false,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative rounded-xl border overflow-hidden transition-all duration-300 group",
        highlight
          ? "border-amber-500/50 bg-gradient-to-br from-dark-700 to-dark-600"
          : "border-dark-500 bg-dark-700 hover:border-brand-purple/50"
      )}
    >
      <div className="h-40 bg-gradient-to-br from-dark-600 to-dark-500 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
            {categoryIcons[category] || "🔒"}
          </span>
        </div>
        <div
          className={cn(
            "absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300",
            category === "hackathon"
              ? "bg-gradient-to-br from-green-500 to-teal-600"
              : category === "workshop"
              ? "bg-gradient-to-br from-blue-500 to-indigo-600"
              : category === "lecture"
              ? "bg-gradient-to-br from-purple-500 to-pink-600"
              : "bg-gradient-to-br from-orange-500 to-red-600"
          )}
        />
        {highlight && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-dark-900 text-xs font-bold rounded-full">
            ✦ Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full border capitalize",
              categoryColors[category] ||
                "text-gray-400 bg-gray-400/10 border-gray-400/30"
            )}
          >
            {category}
          </span>
          <span className="text-gray-500 text-xs">{date}</span>
        </div>
        <h3 className="font-bold text-white text-base mb-2 group-hover:text-brand-purple-light transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
