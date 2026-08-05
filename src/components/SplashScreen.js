"use client";
import { useState, useEffect, useRef } from "react";
import { Sparkles, PartyPopper } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPopped, setIsPopped] = useState(false);
  const [hidePopper, setHidePopper] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Trigger Party Popper Blast at 200ms
    const popperTimer = setTimeout(() => {
      setIsPopped(true);
      triggerConfettiCannon();
    }, 200);

    // 2. Hide Popper Icon & Reveal Clean Logo at 750ms
    const logoTimer = setTimeout(() => {
      setHidePopper(true);
      setShowLogo(true);
    }, 750);

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

    const colors = ["#D4A64A", "#F472B6", "#9333EA", "#10B981", "#3B82F6", "#F59E0B", "#EC4899", "#2563EB"];
    const particles = [];
    const particleCount = 140;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 7;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        size: Math.random() * 9 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 12 - 6,
        opacity: 1,
        gravity: 0.2,
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
        p.opacity -= 0.011;

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-all duration-700 select-none overflow-hidden ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Canvas for Confetti Explosion */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Subtle Gold/Pink Shimmer Aura in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-100/50 via-amber-100/40 to-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
        
        {/* ── 1. Party Popper Icon Blast Animation (Fades out after blast) ── */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            hidePopper
              ? "opacity-0 scale-50 -translate-y-8 max-h-0 pointer-events-none hidden"
              : "opacity-100 scale-100 max-h-40"
          }`}
        >
          <div className="relative inline-block">
            {/* Shockwave Rings on Popper Blast */}
            {isPopped && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-[#2563EB]/40 animate-ping" />
                <div className="absolute -inset-4 rounded-full border border-amber-400/50 animate-pulse" />
              </>
            )}

            <div
              className={`p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 shadow-xl transition-all duration-500 flex items-center justify-center ${
                isPopped ? "scale-125 rotate-12 bg-amber-100 text-amber-700 shadow-2xl" : "scale-100"
              }`}
            >
              <PartyPopper className={`h-12 w-12 sm:h-16 sm:w-16 transition-transform ${isPopped ? "animate-bounce text-[#2563EB]" : "text-amber-600"}`} />
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
        </div>

        {/* ── 2. Logo & Brand Name Reveal (Crystal Clear Image) ── */}
        <div
          className={`transition-all duration-700 ease-out transform space-y-4 ${
            showLogo
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* High Clarity Crisp Logo Image */}
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="Decor Dazzlers Logo"
              className="h-32 sm:h-44 w-auto object-contain shrink-0"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>

          {/* Brand Name & Tagline */}
          <div className="space-y-1.5">
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#703A58] tracking-tight leading-none font-sans">
              Decor <span className="text-[#2563EB] italic font-serif">Dazzlers</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 font-sans tracking-wide font-extrabold flex items-center justify-center gap-1.5 pt-1">
              <Sparkles className="h-4 w-4 text-[#2563EB]" />
              <span>Hyderabad's Premium Party & Event Decorators</span>
              <Sparkles className="h-4 w-4 text-[#2563EB]" />
            </p>
          </div>
        </div>

        {/* ── 3. Bottom Progress Bar & Loading Indicator ── */}
        <div className="w-48 sm:w-64 pt-4 space-y-2">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200 shadow-inner">
            <div className="h-full bg-gradient-to-r from-[#2563EB] via-purple-600 to-[#EC4899] rounded-full animate-splash-progress" />
          </div>
          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest font-sans">
            Preparing Celebration Magic...
          </p>
        </div>

      </div>
    </div>
  );
}
