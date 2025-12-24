"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Splash({ onComplete }) {
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExplode(true), 2400);
    const t2 = setTimeout(() => onComplete(), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  const letters = ["S", "&", "S", " ", "S", "O", "U", "N", "D"];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ willChange: "opacity" }}
      >
        <motion.div
          className="relative flex items-center gap-1 overflow-hidden"
          animate={explode ? { scale: 6, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          {letters.map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                backgroundImage: explode
                  ? "linear-gradient(180deg, #e5e4e2, #ffffff)"
                  : "linear-gradient(180deg, #fde047, #facc15)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextStrokeWidth: explode ? 0.5 : 0.25,
                WebkitTextStrokeColor: explode
                  ? "#d4d4d4"
                  : "rgba(250,204,21,0.5)",
                textShadow: explode
                  ? "0 0 40px rgba(255,255,255,0.35)"
                  : "0 0 22px rgba(250,204,21,0.4)",
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                delay: i * 0.08,
              }}
              className="text-6xl md:text-8xl font-extrabold tracking-wider"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {c}
            </motion.span>
          ))}

          {/* ✨ Shimmer efekti */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-[shine_2.6s_ease-in-out_1]"
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
              mixBlendMode: "screen",
              willChange: "transform, opacity",
            }}
          />

          {/* 💫 Yumuşak parıltı */}
          <div
            aria-hidden
            className="absolute -inset-32 rounded-full blur-3xl"
            style={{
              background: explode
                ? "radial-gradient(circle, rgba(229,228,226,0.25), transparent 70%)"
                : "radial-gradient(circle, rgba(250,204,21,0.25), transparent 70%)",
              opacity: explode ? 0.5 : 0.3,
              transition: "opacity 0.8s ease",
              willChange: "opacity",
            }}
          />

          {/* ⚡ Lens flare efekti */}
          <motion.div
            aria-hidden
            className="absolute left-[-30%] top-1/2 w-[60%] h-[120%] rotate-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              mixBlendMode: "screen",
            }}
            initial={{ x: "-40%", opacity: 0 }}
            animate={{ x: "160%", opacity: explode ? 0 : 1 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
