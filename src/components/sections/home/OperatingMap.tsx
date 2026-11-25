"use client";

import { motion } from "framer-motion";

/**
 * Hero illustration: Nalimat's two lines of work (products and services)
 * converging on the client's business. Labels are generic categories, not
 * claims; edit them here if the offer changes.
 */
const lanes = [
  {
    title: "Products we build",
    y: 44,
    items: ["Business platforms", "Web and mobile apps", "Workflow tools"],
  },
  {
    title: "Services we deliver",
    y: 236,
    items: ["Product design", "Software engineering", "Cloud and DevOps", "AI and automation"],
  },
];

const CHIP_X = 28;
const CHIP_W = 196;
const CHIP_H = 34;
const GAP = 44;
const NODE = { x: 388, y: 206, w: 148, h: 64 };
const OUTCOMES = ["Simpler operations", "Room to innovate", "Steady growth"];

const ease = [0.22, 1, 0.36, 1] as const;

export function OperatingMap() {
  const chips = lanes.flatMap((lane, li) =>
    lane.items.map((label, i) => ({ label, y: lane.y + 26 + i * GAP, key: `${li}-${i}` })),
  );
  const nodeMidY = NODE.y + NODE.h / 2;

  return (
    <figure className="relative rounded-panel bg-navy p-3 sm:p-4">
      <svg
        viewBox="0 0 560 460"
        role="img"
        aria-labelledby="map-title map-desc"
        className="h-auto w-full"
      >
        <title id="map-title">How Nalimat works</title>
        <desc id="map-desc">
          Nalimat&apos;s products and services both connect to your business, helping it simplify operations,
          innovate and grow.
        </desc>

        {/* Faint grid */}
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#ffffff" strokeOpacity="0.045" />
          </pattern>
        </defs>
        <rect width="560" height="460" rx="14" fill="url(#grid)" />

        {lanes.map((lane) => (
          <text key={lane.title} x={CHIP_X} y={lane.y} fill="#ffffff" fontSize="13" fontWeight="600">
            {lane.title}
          </text>
        ))}

        {/* Connectors */}
        {chips.map((c, i) => {
          const sy = c.y + CHIP_H / 2;
          const sx = CHIP_X + CHIP_W;
          const mx = (sx + NODE.x) / 2;
          return (
            <motion.path
              key={`p-${c.key}`}
              d={`M${sx} ${sy} C ${mx} ${sy}, ${mx} ${nodeMidY}, ${NODE.x} ${nodeMidY}`}
              fill="none"
              stroke="#F06020"
              strokeOpacity="0.55"
              strokeWidth="1.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.45 + i * 0.06, ease }}
            />
          );
        })}

        {/* Chips */}
        {chips.map((c, i) => (
          <motion.g
            key={`c-${c.key}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.05, ease }}
          >
            <rect
              x={CHIP_X}
              y={c.y}
              width={CHIP_W}
              height={CHIP_H}
              rx="8"
              fill="#1A3350"
              stroke="#ffffff"
              strokeOpacity="0.1"
            />
            <circle cx={CHIP_X + 16} cy={c.y + CHIP_H / 2} r="3" fill="#C9D4E0" fillOpacity="0.6" />
            <text x={CHIP_X + 30} y={c.y + CHIP_H / 2 + 4.5} fill="#C9D4E0" fontSize="13">
              {c.label}
            </text>
          </motion.g>
        ))}

        {/* Destination */}
        <motion.g
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease }}
          style={{ transformOrigin: `${NODE.x + NODE.w / 2}px ${nodeMidY}px` }}
        >
          <rect x={NODE.x} y={NODE.y} width={NODE.w} height={NODE.h} rx="12" fill="#F06020" />
          <text
            x={NODE.x + NODE.w / 2}
            y={nodeMidY + 5}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="15"
            fontWeight="600"
          >
            Your business
          </text>
        </motion.g>

        {OUTCOMES.map((o, i) => (
          <motion.text
            key={o}
            x={NODE.x + 4}
            y={NODE.y + NODE.h + 34 + i * 22}
            fill="#C9D4E0"
            fontSize="12.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.35 + i * 0.1 }}
          >
            {o}
          </motion.text>
        ))}
      </svg>
    </figure>
  );
}
