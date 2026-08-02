"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════ */
/*  GHOST CURSOR — Premium squishy ghost with gooey tail,              */
/*  animated rips, and click mouth animation                             */
/*  Adapted to Forest Green / Moss Green / Champagne Gold palette        */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function GhostCursor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ─── STATE ────────────────────────────────────────────────────
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, dir: "" as "left" | "right" | "" };
    let clicked = false;
    const pos = { x: 0, y: 0 };

    // DOM elements
    const ghostEl = document.querySelector("#forest-ghost") as HTMLElement;
    const mouthEl = document.querySelector(".ghost__mouth") as HTMLElement;
    const eyesEl = document.querySelector(".ghost__eyes") as HTMLElement;

    // Color constants
    const BG = "#1E3A2F";
    const GHOST_WHITE = "#F5F1EA";
    const EYES_BG = "#1E3A2F";

    // ─── MOUSE TRACKING ───────────────────────────────────────────
    const getMouse = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches.length > 0) {
        mouse.x = e.touches[0].pageX;
        mouse.y = e.touches[0].pageY;
      } else if ("clientX" in e) {
        const me = e as MouseEvent;
        mouse.dir = pos.x > me.clientX ? "left" : "right";
        mouse.x = me.clientX;
        mouse.y = me.clientY;
      }
    };

    const onMouseDown = () => { clicked = true; };
    const onMouseUp = () => { clicked = false; };

    document.addEventListener("mousemove", getMouse);
    document.addEventListener("touchstart", getMouse, { passive: true });
    document.addEventListener("touchmove", getMouse, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // ─── MAP FUNCTION ─────────────────────────────────────────────
    function map(num: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
      return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    // ─── ANIMATION LOOP ───────────────────────────────────────────
    let rafId: number;

    const follow = () => {
      if (!ghostEl) return;

      if (prefersReducedMotion) {
        pos.x = mouse.x;
        pos.y = mouse.y;
      } else {
        const distX = mouse.x - pos.x;
        const distY = mouse.y - pos.y;

        const velX = distX / 8;
        const velY = distY / 8;

        pos.x += distX / 10;
        pos.y += distY / 10;

        const skewX = map(velX, 0, 100, 0, -50);
        const scaleY = map(velY, 0, 100, 1, 2.0);
        const scaleEyeX = map(Math.abs(velX), 0, 100, 1, 1.2);
        const scaleEyeY = map(Math.abs(velX * 2), 0, 100, 1, 0.1);
        const scaleMouth = Math.min(
          Math.max(
            map(Math.abs(velX * 1.5), 0, 100, 0, 10),
            map(Math.abs(velY * 1.2), 0, 100, 0, 5)
          ),
          2
        );

        if (clicked) {
          const eyeY = 0.4;
          const mouthY = -scaleMouth;

          ghostEl.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(0.7) skew(${skewX}deg) rotate(${-skewX}deg) scaleY(${scaleY})`;

          if (eyesEl) {
            eyesEl.style.transform = `translateX(-50%) scale(${scaleEyeX}, ${eyeY})`;
          }
          if (mouthEl) {
            mouthEl.style.transform = `translate(${-skewX * 0.5 - 10}px) scale(${mouthY})`;
          }
        } else {
          ghostEl.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(0.7) skew(${skewX}deg) rotate(${-skewX}deg) scaleY(${scaleY})`;

          if (eyesEl) {
            eyesEl.style.transform = `translateX(-50%) scale(${scaleEyeX}, ${scaleEyeY})`;
          }
          if (mouthEl) {
            mouthEl.style.transform = `translate(${-skewX * 0.5 - 10}px) scale(${scaleMouth})`;
          }
        }
      }

      rafId = requestAnimationFrame(follow);
    };

    rafId = requestAnimationFrame(follow);

    // ─── ORIGINAL CURSOR STAYS (black default cursor) ────────────
    // No cursor hiding — the ghost follows behind the native cursor

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", getMouse);
      document.removeEventListener("touchstart", getMouse);
      document.removeEventListener("touchmove", getMouse);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      // Nothing to restore since we never hid the cursor
    };
  }, []);

  return (
    <>
      {/* SVG Gooey Filter */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="ghost-goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="ghost-blur"
            />
            <feColorMatrix
              in="ghost-blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 16 -7"
              result="ghost-gooey"
            />
          </filter>
        </defs>
      </svg>

      {/* Ghost Element */}
      <style>{`
        #forest-ghost {
          position: fixed;
          z-index: 10001;
          transform-origin: center;
          width: 90px;
          margin: 20px 0 0 -45px;
          pointer-events: none;
        }

        .ghost__eyes,
        .ghost__mouth {
          position: absolute;
          z-index: 1;
          width: 15px;
          height: 15px;
          top: 34px;
          left: 50%;
          transform: translate(-50%);
          border-radius: 50px;
          background: #1E3A2F;
          margin-left: -20px;
          transform-origin: center;
          transition: none;
        }

        .ghost__eyes {
          box-shadow: 40px 0 0 #1E3A2F;
        }

        .ghost__mouth {
          margin: 0;
          top: 60px;
          transform: scale(0);
          border-radius: 20px 20px 12px 12px;
          width: 20px;
          transform-origin: center bottom;
          overflow: hidden;
        }

        .ghost__tail {
          position: absolute;
          z-index: -1;
          top: 82px;
          height: 55px;
          width: 100%;
          filter: url(#ghost-goo);
        }

        .ghost__tail::before {
          content: '';
          background: #F5F1EA;
          position: absolute;
          bottom: 35px;
          left: 0;
          height: 100px;
          width: 100%;
          border-radius: 40px 40px 5px 5px;
        }

        .ghost__rip {
          width: 15px;
          height: 28px;
          background: #F5F1EA;
          position: absolute;
          top: 15px;
          left: 0;
          box-shadow:
            -62px 0 0 #F5F1EA,
            -31px 0 0 #F5F1EA,
            31px 0 0 #F5F1EA,
            62px 0 0 #F5F1EA,
            93px 0 0 #F5F1EA;
          border-radius: 50%;
          animation: ghost-rips 1.2s linear infinite;
        }

        @keyframes ghost-rips {
          0% {
            left: 0;
            top: 12px;
          }
          50% {
            left: 31px;
            top: 20px;
          }
          100% {
            left: 62px;
            top: 12px;
          }
        }

        .ghost__head {
          position: relative;
          background: #F5F1EA;
          border-radius: 50% 50% 45% 45%;
          width: 90px;
          height: 82px;
        }
      `}</style>

      <div ref={containerRef} id="forest-ghost">
        <div className="ghost__head">
          <div className="ghost__eyes"></div>
          <div className="ghost__mouth"></div>
        </div>
        <div className="ghost__tail">
          <div className="ghost__rip"></div>
        </div>
      </div>
    </>
  );
}
