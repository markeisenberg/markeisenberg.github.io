import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const PARTICLE_COUNT = 480;
const INITIAL_PARTICLE_COUNT = 80; // Reduced for performance
const ASPECT_RATIO = 92 / 60;

const researchPath =
  "M33 39H30C28.3431 39 27 40.3431 27 42V55C27 56.6569 28.3431 58 30 58H40C41.6569 58 43 56.6569 43 55V42C43 40.3431 41.6569 39 40 39H37M55 41H59M31 43H39M31 48H39M31 52H39M48.5 23C49.5 23.5 50.5 24.5 52.5 23M39.5 17.7922C40.2529 17.4158 41.0058 16.7559 42.1856 17.093M24 42H10C5.02944 42 1 46.0294 1 51V57H24M67 42H81C85.9706 42 90 46.0294 90 51V57H67M37 43V38C37 37.4477 36.5523 37 36 37H34C33.4477 37 33 37.4477 33 38V43M41.5 23C37.3579 23 34 19.6421 34 15.5C34 11.3579 37.3579 8 41.5 8C44.1716 8 46.5169 9.39683 47.8454 11.5M53 58H61C62.6569 58 64 56.6569 64 55V41C64 39.3431 62.6569 38 61 38H53C51.3431 38 50 39.3431 50 41V55C50 56.6569 51.3431 58 53 58ZM84 30C84 34.4183 80.4183 38 76 38C71.5817 38 68 34.4183 68 30C68 25.5817 71.5817 22 76 22C80.4183 22 84 25.5817 84 30ZM7 30C7 34.4183 10.5817 38 15 38C19.4183 38 23 34.4183 23 30C23 25.5817 19.4183 22 15 22C10.5817 22 7 25.5817 7 30ZM62.8532 35.6641C59.2901 35.3983 53.8919 33.2218 50.6616 32.058C50.5536 32.0191 50.4413 32 50.3266 32L46.5 32C36.2827 32 28 25.0604 28 16.5C28 7.93959 36.2827 1 46.5 1C56.7173 1 65 7.93959 65 16.5C65 21.0228 62.6879 25.1664 59 27.9999C58.5784 29.8683 60.9335 32.4443 63.233 34.251C63.9037 34.778 63.7038 35.7276 62.8532 35.6641ZM58 20.5C58 24.6421 54.6421 28 50.5 28C46.3579 28 43 24.6421 43 20.5C43 16.3579 46.3579 13 50.5 13C54.6421 13 58 16.3579 58 20.5ZM53 19.5C53 19.2239 52.7761 19 52.5 19C52.2239 19 52 19.2239 52 19.5C52 19.7761 52.2239 20 52.5 20C52.7761 20 53 19.7761 53 19.5ZM44 13.5C44 13.2239 43.7761 13 43.5 13C43.2239 13 43 13.2239 43 13.5C43 13.7761 43.2239 14 43.5 14C43.7761 14 44 13.7761 44 13.5ZM49 19.5C49 19.2239 48.7761 19 48.5 19C48.2239 19 48 19.2239 48 19.5C48 19.7761 48.2239 20 48.5 20C48.7761 20 49 19.7761 49 19.5ZM40 13.5C40 13.2239 39.7761 13 39.5 13C39.2239 13 39 13.2239 39 13.5C39 13.7761 39.2239 14 39.5 14C39.7761 14 40 13.7761 40 13.5Z";

function randomOffset() {
  // Small random offset for floating effect
  return (Math.random() - 0.5) * 2;
}

export default function Dots() {
  const ref = useRef(null);
  const pathRef = useRef(null);
  const [morph, setMorph] = useState(false);
  const [particles, setParticles] = useState([]);
  const [floatParticles, setFloatParticles] = useState([]);
  const [velocities, setVelocities] = useState([]);
  const [pathPoints, setPathPoints] = useState([]);

  // Track if morph is locked (clicked)
  const [locked, setLocked] = useState(false);
  const [prevCount, setPrevCount] = useState(INITIAL_PARTICLE_COUNT);
  const [maskRadius, setMaskRadius] = useState(0);
  const [randomOpacities, setRandomOpacities] = useState([]);
  const [opacityProgress, setOpacityProgress] = useState(0);
  const [opacityDirection, setOpacityDirection] = useState(1); // 1 = to 100, -1 = to random

  // Generate initial random particles and random opacities on mount (client only)
  useEffect(() => {
    const initialParticles = Array.from({ length: INITIAL_PARTICLE_COUNT }).map(() => ({
      x: Math.random() * 92,
      y: Math.random() * 60,
      r: Math.random() * 0.7 + 0.5,
      color: "currentColor",
    }));
    setParticles(initialParticles);
    setFloatParticles(initialParticles);

    // Assign a random opacity between 1 and 100 for each particle
    const opacities = Array.from({ length: INITIAL_PARTICLE_COUNT }).map(
      () => Math.random() * 99 + 1 // [1, 100)
    );
    setRandomOpacities(opacities);

    // Assign a random velocity to each particle
    const initialVelocities = Array.from({ length: INITIAL_PARTICLE_COUNT }).map(() => ({
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setVelocities(initialVelocities);
  }, []);
  
  // Animate opacity progress from random to 100 and back, looping every 10 seconds
  useEffect(() => {
    let raf;
    let start;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000; // seconds
      const progress = Math.min(1, elapsed / 10);
      if (opacityDirection === 1) {
        setOpacityProgress(progress);
        if (progress < 1) {
          raf = requestAnimationFrame(animate);
        } else {
          setOpacityDirection(-1);
        }
      } else {
        setOpacityProgress(1 - progress);
        if (progress < 1) {
          raf = requestAnimationFrame(animate);
        } else {
          setOpacityDirection(1);
        }
      }
    }
    raf = requestAnimationFrame(animate);
    return () => raf && cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [opacityDirection]);

  // On morph (hover), increase to full PARTICLE_COUNT and remember previous count
  useEffect(() => {
    if (morph && particles.length !== PARTICLE_COUNT) {
      setPrevCount(particles.length);
      const moreParticles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        if (i < particles.length) return particles[i];
        return {
          x: Math.random() * 92,
          y: Math.random() * 60,
          r: Math.random() * 0.7 + 0.5,
          color: "currentColor",
        };
      });
      setParticles(moreParticles);
      setFloatParticles(moreParticles);
      const moreVelocities = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        if (i < velocities.length) return velocities[i];
        return {
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        };
      });
      setVelocities(moreVelocities);
    }
  // eslint-disable-next-line
  }, [morph]);

  // Floating animation: update floatParticles every frame, bounce off edges
  useEffect(() => {
    if (morph) return; // Stop floating when morph starts
    if (particles.length === 0 || velocities.length === 0) return;
    let raf;
    function animate() {
      setFloatParticles((prev) => {
        return prev.map((p, i) => {
          let { x, y, r } = p;
          let { vx, vy } = velocities[i];

          // Move particle
          let nx = x + vx;
          let ny = y + vy;

          // Bounce off left/right
          if (nx - r < 0) {
            nx = r;
            velocities[i].vx = -vx;
          } else if (nx + r > 92) {
            nx = 92 - r;
            velocities[i].vx = -vx;
          }

          // Bounce off top/bottom
          if (ny - r < 0) {
            ny = r;
            velocities[i].vy = -vy;
          } else if (ny + r > 60) {
            ny = 60 - r;
            velocities[i].vy = -vy;
          }

          // Add a tiny random jitter to velocity for more natural movement
          velocities[i].vx += (Math.random() - 0.5) * 0.02;
          velocities[i].vy += (Math.random() - 0.5) * 0.02;

          // Limit velocity
          velocities[i].vx = Math.max(-0.7, Math.min(0.7, velocities[i].vx));
          velocities[i].vy = Math.max(-0.7, Math.min(0.7, velocities[i].vy));

          return { ...p, x: nx, y: ny };
        });
      });
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => raf && cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [morph, particles, velocities]);

  useEffect(() => {
    if (!morph || particles.length !== PARTICLE_COUNT) return;
    const temp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    temp.setAttribute("d", researchPath);
    const len = temp.getTotalLength();
    const pts = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pt = temp.getPointAtLength((i / PARTICLE_COUNT) * len);
      pts.push({ x: pt.x, y: pt.y });
    }
    setPathPoints(pts);
  }, [morph, particles]);

  // Only morph on hover if not locked, never reverse on mouse leave if locked
  // Reverse morph only on click if locked
  const handleMouseEnter = () => {
    if (!locked) setMorph(true);
  };
  const handleMouseLeave = () => {
    // Do not reverse morph on mouse leave
  };
  const handleClick = () => {
    if (locked) {
      setLocked(false);
      setMorph(false);
      // Reduce to initial count on unlock
      setParticles((prev) => prev.slice(0, INITIAL_PARTICLE_COUNT));
      setFloatParticles((prev) => prev.slice(0, INITIAL_PARTICLE_COUNT));
      setVelocities((prev) => prev.slice(0, INITIAL_PARTICLE_COUNT));
      setPathPoints([]); // Clear path points
      setPrevCount(INITIAL_PARTICLE_COUNT);
      // Send particles out at a faster velocity
      setVelocities((prev) =>
        prev.map((v, i) => {
          // Give each particle a random direction and a higher speed
          const angle = Math.random() * 2 * Math.PI;
          const speed = 2 + Math.random() * 1.5; // much faster than normal
          return {
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
          };
        })
      );
    } else {
      setLocked(true);
      setMorph(true);
    }
  };

  // Animate the radial mask on mount
  useEffect(() => {
    let start;
    let raf;
    function animateMask(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000; // seconds
      // Animate from 0% to 100% over 5 seconds
      const progress = Math.min(1, elapsed / 5);
      setMaskRadius(progress);
      if (progress < 1) {
        raf = requestAnimationFrame(animateMask);
      }
    }
    setMaskRadius(0);
    raf = requestAnimationFrame(animateMask);
    return () => raf && cancelAnimationFrame(raf);
  }, []);

  // Animate dots from random to path, or float if not morphing
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        aspectRatio: `${ASPECT_RATIO}`,
        position: "relative",
        overflow: "visible",
        background: "none",
        borderRadius: 16,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Radial gradient mask overlay */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 2,
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, white ${maskRadius * 100}%, transparent ${maskRadius * 100 + 5}%)`,
          maskImage: `radial-gradient(circle at 50% 50%, white ${maskRadius * 100}%, transparent ${maskRadius * 100 + 5}%)`,
          transition: "mask-image 0.1s, -webkit-mask-image 0.1s",
        }}
      >
        {/* This div is only for the mask, no content */}
      </div>
      {/* SVG particles */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 92 60"
        width="100%"
        height="100%"
        style={{ display: "block", position: "relative", zIndex: 1 }}
      >
        {(morph && pathPoints.length === PARTICLE_COUNT ? particles : floatParticles).map((p, i) => {
          const target = morph && pathPoints[i] ? pathPoints[i] : p;
          const isNew = morph && i >= prevCount;

          // For initial 80 particles, use random opacity that animates to 100 over 10s, then back to original over 10s, looping
          let initialOpacity = 0.8;
          if (!morph && i < INITIAL_PARTICLE_COUNT && randomOpacities.length === INITIAL_PARTICLE_COUNT) {
            const start = randomOpacities[i] / 100;
            initialOpacity = start + (1 - start) * opacityProgress;
          }

          return (
            <motion.circle
              key={i}
              initial={{
                cx: p.x,
                cy: p.y,
                r: p.r,
                opacity: isNew ? 0 : initialOpacity,
              }}
              animate={
                morph && pathPoints.length === PARTICLE_COUNT
                  ? {
                      cx: target.x,
                      cy: target.y,
                      r: 0.6,
                      opacity: 1,
                    }
                  : {
                      cx: floatParticles[i]?.x ?? p.x,
                      cy: floatParticles[i]?.y ?? p.y,
                      r: p.r,
                      opacity: isNew ? 0.8 : initialOpacity,
                    }
              }
              transition={{
                duration: morph ? 0.5 : 1,
                ease: "easeInOut",
                delay: morph
                  ? isNew
                    ? 0.2 + (i - prevCount) * 0.002
                    : i * 0.002
                  : 0,
                opacity: isNew ? { duration: 0.7, delay: 0.1 + (i - prevCount) * 0.002 } : undefined,
              }}
              fill={p.color}
            />
          );
        })}
        <path ref={pathRef} d={researchPath} fill="none" stroke="none" />
      </svg>
    </div>
  );
}
