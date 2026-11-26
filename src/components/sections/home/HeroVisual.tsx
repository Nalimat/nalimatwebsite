import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

/**
 * Homepage hero illustration: connected business operations.
 *
 * Four floating panels (a quotation document, an operations chart, a website
 * and a mobile app) connect through flowing lines to a central NALIMAT core,
 * over a retro-futurist perspective grid. Original SVG, no image requests.
 *
 * Motion: a staggered entrance; slow floating layers, flowing connector
 * dashes, light pulses travelling to the core and two orbiting dots (CSS,
 * see globals.css); pointer parallax by depth plus a gentle 3D tilt of the
 * whole composition on devices with a fine pointer. Everything stops for
 * prefers-reduced-motion.
 * Decorative: the figure carries one accessible label.
 */

const ease = [0.22, 1, 0.36, 1] as const;
const CORE = { x: 300, y: 288 };

const connectors = [
  { from: [222, 152], d: "M222 152 C 268 154, 262 232, 288 262" },
  { from: [382, 142], d: "M382 142 C 336 150, 332 228, 314 262" },
  { from: [236, 392], d: "M236 392 C 274 386, 272 336, 290 314" },
  { from: [440, 396], d: "M440 396 C 384 390, 336 352, 312 314" },
] as const;

/** One parallax layer: entrance fade/rise, then follows the pointer by `depth`. */
function Layer({
  depth,
  delay,
  sx,
  sy,
  children,
}: {
  depth: number;
  delay: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  children: ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.g style={{ x, y }}>
      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease }}
      >
        {children}
      </motion.g>
    </motion.g>
  );
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, (v) => v * 7);
  const rotateX = useTransform(sy, (v) => v * -5);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative"
      style={{ rotateX, rotateY, transformPerspective: 1300 }}
    >
      <svg
        viewBox="0 0 600 540"
        role="img"
        aria-label="Illustration: a quotation, a website, a mobile app and an operations dashboard connected to NALIMAT Technology"
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F06020" stopOpacity="0.38" />
            <stop offset="0.55" stopColor="#F06020" stopOpacity="0.08" />
            <stop offset="1" stopColor="#F06020" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hv-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#284563" />
            <stop offset="1" stopColor="#10243A" />
          </linearGradient>
          <linearGradient id="hv-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1F3B5A" />
            <stop offset="1" stopColor="#172F4B" />
          </linearGradient>
          <linearGradient id="hv-floor-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="hv-floor-mask">
            <rect x="0" y="318" width="600" height="222" fill="url(#hv-floor-fade)" />
          </mask>
          <filter id="hv-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#050E19" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Backdrop: glow, perspective floor, orbits */}
        <Layer depth={-4} delay={0.15} sx={sx} sy={sy}>
          <circle cx={CORE.x} cy={CORE.y} r="230" fill="url(#hv-glow)" className="anim-glow" />
          <g mask="url(#hv-floor-mask)" stroke="#fff" strokeOpacity="0.14" strokeWidth="1">
            {[336, 356, 382, 418, 466, 530].map((y) => (
              <line key={y} x1="0" x2="600" y1={y} y2={y} />
            ))}
            {Array.from({ length: 15 }, (_, i) => -450 + i * 107).map((x) => (
              <line key={x} x1={300} y1={300} x2={x} y2={540} />
            ))}
          </g>
          <ellipse cx={CORE.x} cy={CORE.y} rx="262" ry="82" fill="none" stroke="#fff" strokeOpacity="0.07" />
          <ellipse
            cx={CORE.x}
            cy={CORE.y}
            rx="182"
            ry="57"
            fill="none"
            stroke="#F06020"
            strokeOpacity="0.35"
            strokeDasharray="2 7"
          />
          <ellipse cx={CORE.x} cy={CORE.y} rx="112" ry="35" fill="none" stroke="#fff" strokeOpacity="0.08" />
          <circle r="3" fill="#F06020" className="anim-orbit" style={{ offsetPath: `path("M118 288 a182 57 0 1 0 364 0 a182 57 0 1 0 -364 0")` }} />
          <circle
            r="2.5"
            fill="#F2E8D5"
            fillOpacity="0.8"
            className="anim-orbit"
            style={{ offsetPath: `path("M118 288 a182 57 0 1 0 364 0 a182 57 0 1 0 -364 0")`, animationDelay: "-13s" }}
          />
        </Layer>

        {/* Connectors: a quiet base line with a flowing dash on top */}
        <Layer depth={2} delay={0.55} sx={sx} sy={sy}>
          {connectors.map((c, i) => (
            <g key={i}>
              <path d={c.d} fill="none" stroke="#F06020" strokeOpacity="0.28" strokeWidth="1.25" />
              <path d={c.d} fill="none" stroke="#F06020" strokeOpacity="0.9" strokeWidth="1.5" className="anim-dash" />
              <circle cx={c.from[0]} cy={c.from[1]} r="5" fill="#10243A" stroke="#F06020" strokeWidth="1.5" />
              {/* light pulse travelling to the core */}
              <circle
                r="3.5"
                fill="#FFD2B8"
                className="anim-travel"
                style={{ offsetPath: `path("${c.d}")`, animationDelay: `${i * 0.85}s`, filter: "drop-shadow(0 0 6px #F06020)" }}
              />
            </g>
          ))}
        </Layer>

        {/* Core: NALIMAT monogram */}
        <Layer depth={3} delay={0.35} sx={sx} sy={sy}>
          <circle cx={CORE.x} cy={CORE.y} r="74" fill="none" stroke="#F06020" strokeOpacity="0.45" />
          <circle cx={CORE.x} cy={CORE.y} r="92" fill="none" stroke="#fff" strokeOpacity="0.06" />
          <g filter="url(#hv-shadow)">
            <rect x="250" y="238" width="100" height="100" rx="26" fill="url(#hv-core)" stroke="#fff" strokeOpacity="0.2" />
          </g>
          <g transform="translate(268 256) scale(2)">
            <path d="M9.5 23V9h2.6l7.4 9.9V9h3v14h-2.6l-7.4-9.9V23h-3Z" fill="#fff" />
            <rect x="22.5" y="20" width="3" height="3" rx="0.6" fill="#F06020" />
          </g>
        </Layer>

        {/* Panel 1: quotation document (paper) */}
        <Layer depth={9} delay={0.45} sx={sx} sy={sy}>
          <g className="anim-float">
            <rect x="52" y="58" width="182" height="206" rx="14" fill="#F2E8D5" fillOpacity="0.16" />
            <g filter="url(#hv-shadow)">
              <rect x="40" y="46" width="182" height="206" rx="14" fill="#FCFAF5" />
            </g>
            <rect x="56" y="62" width="22" height="22" rx="6" fill="#10243A" />
            <rect x="73" y="77" width="4" height="4" rx="1" fill="#F06020" />
            <text x="86" y="77" fill="#10243A" fontSize="9.5" fontWeight="700" letterSpacing="1.4" fontFamily="ui-monospace, Consolas, monospace">
              QUOTATION
            </text>
            <rect x="160" y="68" width="46" height="8" rx="4" fill="#E3D9C8" />
            <rect x="56" y="100" width="70" height="6" rx="3" fill="#10243A" fillOpacity="0.75" />
            <rect x="56" y="112" width="104" height="5" rx="2.5" fill="#E3D9C8" />
            {[132, 150, 168].map((y, i) => (
              <g key={y}>
                <rect x="56" y={y} width={[96, 78, 88][i]} height="5" rx="2.5" fill="#657080" fillOpacity="0.45" />
                <rect x="176" y={y} width="30" height="5" rx="2.5" fill="#657080" fillOpacity="0.45" />
              </g>
            ))}
            <line x1="56" x2="206" y1="186" y2="186" stroke="#E3D9C8" />
            <text x="56" y="204" fill="#657080" fontSize="8.5" letterSpacing="1.2" fontFamily="ui-monospace, Consolas, monospace">
              TOTAL
            </text>
            <rect x="160" y="196" width="46" height="10" rx="5" fill="#10243A" />
            <rect x="56" y="222" width="52" height="16" rx="8" fill="#F06020" fillOpacity="0.14" />
            <circle cx="66" cy="230" r="3" fill="#F06020" />
            <rect x="73" y="227.5" width="27" height="5" rx="2.5" fill="#C84B12" fillOpacity="0.7" />
          </g>
        </Layer>

        {/* Panel 2: operations chart */}
        <Layer depth={6} delay={0.6} sx={sx} sy={sy}>
          <g className="anim-float-slow">
            <g filter="url(#hv-shadow)">
              <rect x="382" y="44" width="178" height="150" rx="14" fill="url(#hv-panel)" stroke="#fff" strokeOpacity="0.12" />
            </g>
            <text x="398" y="70" fill="#DDD3C2" fontSize="8.5" letterSpacing="1.3" fontFamily="ui-monospace, Consolas, monospace">
              OPERATIONS
            </text>
            <circle cx="540" cy="67" r="3" fill="#75856B" />
            <path d="M398 126 C 420 118, 432 96, 452 102 S 488 82, 506 90 S 534 74, 544 78" fill="none" stroke="#75856B" strokeWidth="2" strokeLinecap="round" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={400 + i * 24}
                y={176 - [22, 34, 28, 46, 38, 54][i]}
                width="12"
                height={[22, 34, 28, 46, 38, 54][i]}
                rx="3"
                fill={i === 5 ? "#F06020" : "#fff"}
                fillOpacity={i === 5 ? 1 : 0.16}
              />
            ))}
          </g>
        </Layer>

        {/* Panel 3: website */}
        <Layer depth={7} delay={0.7} sx={sx} sy={sy}>
          <g className="anim-float-late">
            <g filter="url(#hv-shadow)">
              <rect x="40" y="326" width="196" height="146" rx="14" fill="url(#hv-panel)" stroke="#fff" strokeOpacity="0.12" />
            </g>
            {[56, 66, 76].map((x, i) => (
              <circle key={x} cx={x} cy="342" r="3" fill={i === 0 ? "#F06020" : "#fff"} fillOpacity={i === 0 ? 1 : 0.25} />
            ))}
            <rect x="92" y="338" width="128" height="8" rx="4" fill="#fff" fillOpacity="0.08" />
            <rect x="52" y="358" width="172" height="44" rx="8" fill="#F2E8D5" />
            <rect x="62" y="370" width="74" height="7" rx="3.5" fill="#10243A" />
            <rect x="62" y="383" width="52" height="5" rx="2.5" fill="#10243A" fillOpacity="0.35" />
            <rect x="172" y="372" width="40" height="14" rx="7" fill="#F06020" />
            {[52, 112, 172].map((x) => (
              <rect key={x} x={x} y="412" width="52" height="44" rx="7" fill="#fff" fillOpacity="0.07" />
            ))}
          </g>
        </Layer>

        {/* Panel 4: mobile app */}
        <Layer depth={11} delay={0.8} sx={sx} sy={sy}>
          <g className="anim-float">
            <g filter="url(#hv-shadow)">
              <rect x="440" y="300" width="112" height="200" rx="22" fill="#0B1B2D" stroke="#fff" strokeOpacity="0.2" />
            </g>
            <rect x="448" y="308" width="96" height="184" rx="16" fill="#1A3350" />
            <rect x="480" y="314" width="32" height="5" rx="2.5" fill="#0B1B2D" />
            <rect x="456" y="330" width="80" height="54" rx="10" fill="#F2E8D5" />
            <rect x="464" y="340" width="40" height="6" rx="3" fill="#10243A" />
            <rect x="464" y="351" width="58" height="4" rx="2" fill="#10243A" fillOpacity="0.35" />
            <rect x="464" y="364" width="30" height="12" rx="6" fill="#F06020" />
            {[394, 418, 442].map((y) => (
              <g key={y}>
                <rect x="456" y={y} width="80" height="18" rx="6" fill="#fff" fillOpacity="0.08" />
                <circle cx="466" cy={y + 9} r="3.5" fill="#75856B" />
                <rect x="474" y={y + 7} width="42" height="4" rx="2" fill="#fff" fillOpacity="0.4" />
              </g>
            ))}
            <rect x="476" y="478" width="40" height="4" rx="2" fill="#fff" fillOpacity="0.3" />
          </g>
        </Layer>
      </svg>
    </motion.div>
  );
}
