"use client";
import { useState, useEffect, useRef } from "react";
import { Sparkles, PartyPopper } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPopped, setIsPopped] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Trigger Party Popper Blast at 300ms
    const popperTimer = setTimeout(() => {
      setIsPopped(true);
      triggerConfettiCannon();
    }, 300);

    // 2. Reveal Logo at 600ms
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 600);

    // 3. Start Fade-out transition at 2600ms
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2600);

    // 4. Complete unmount at 3200ms
    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => {
      clearTimeout(popperTimer);
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Party Popper HTML5 Canvas Particle Blast System
  const triggerConfettiCannon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#D4A64A", "#F472B6", "#9333EA", "#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#FFFFFF"];
    const particles = [];
    const particleCount = 120;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        opacity: 1,
        gravity: 0.18,
        drag: 0.96,
        shape: Math.random() > 0.4 ? "rect" : "circle"
      });
    }

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.opacity <= 0) return;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.012;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (alive) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#1B061A] via-[#350F30] to-[#120313] transition-all duration-700 select-none overflow-hidden ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Canvas for Confetti Explosion */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Radial Gold Shimmer Glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-400/20 via-pink-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
        
        {/* ── 1. Party Popper Icon Blast Animation ── */}
        <div className="relative">
          {/* Shockwave Rings on Popper Blast */}
          {isPopped && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/80 animate-ping" />
              <div className="absolute -inset-4 rounded-full border border-pink-400/50 animate-pulse" />
            </>
          )}

          <div
            className={`p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-400 shadow-2xl transition-all duration-500 flex items-center justify-center ${
              isPopped ? "scale-125 rotate-12 bg-amber-400/20 text-amber-300" : "scale-100"
            }`}
          >
            <PartyPopper className={`h-12 w-12 sm:h-16 sm:w-16 transition-transform ${isPopped ? "animate-bounce" : ""}`} />
          </div>

          {/* Floating Emoji Pops */}
          {isPopped && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-2xl animate-fade-in">
              <span className="animate-bounce delay-75">🎉</span>
              <span className="animate-bounce delay-150">🎈</span>
              <span className="animate-bounce delay-200">✨</span>
              <span className="animate-bounce delay-300">🥳</span>
            </div>
          )}
        </div>

        {/* ── 2. Logo & Brand Name Reveal ── */}
        <div
          className={`transition-all duration-700 transform space-y-3 ${
            showLogo
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-90"
          }`}
        >
          {/* Brand Logo */}
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="Decor Dazzlers Logo"
              className="h-28 sm:h-36 w-auto object-contain drop-shadow-[0_10px_25px_rgba(212,166,74,0.4)] animate-pulse"
            />
          </div>

          {/* Brand Name */}
          <div className="space-y-1">
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-white tracking-tight leading-none font-sans">
              Decor <span className="text-brand-gold italic">Dazzlers</span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-pink/90 font-sans tracking-wide font-medium flex items-center justify-center gap-1.5 pt-1">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold animate-spin" />
              <span>Hyderabad's Premium Party & Event Decorators</span>
              <Sparkles className="h-3.5 w-3.5 text-brand-gold animate-spin" />
            </p>
          </div>
        </div>

        {/* ── 3. Bottom Progress Bar & Loading Indicator ── */}
        <div className="w-48 sm:w-64 pt-4 space-y-2">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div className="h-full bg-gradient-to-r from-amber-400 via-pink-400 to-amber-300 rounded-full animate-splash-progress" />
          </div>
          <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest font-sans">
            Preparing Celebration Magic...
          </p>
        </div>

      </div>
    </div>
  );
}
