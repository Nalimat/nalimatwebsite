import { cn } from "@/lib/cn";

/**
 * Concept illustration for Studata (upcoming project): student information,
 * attendance and progress brought together around one profile. Abstract
 * shapes rather than a working interface, so no feature appears available;
 * the stage that hosts it labels it as a concept for an upcoming project.
 * Decorative (aria-hidden).
 */
export function StudataVisual({ className }: { className?: string }) {
  const mono = "ui-monospace, Consolas, monospace";
  return (
    <div aria-hidden className={cn("select-none [perspective:1400px]", className)}>
      <svg
        viewBox="0 0 480 330"
        className="h-auto w-full overflow-visible transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateX(5deg)_rotateY(7deg)_translateY(-6px)] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
      >
        <defs>
          <filter id="sd-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#050E19" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* connectors */}
        <g fill="none" stroke="#75856B" strokeOpacity="0.75" strokeWidth="1.25">
          <path d="M196 120 C 230 120, 236 70, 270 70" />
          <path d="M196 196 C 232 196, 238 238, 270 238" />
        </g>
        <g fill="none" stroke="#F06020" strokeWidth="1.5" className="anim-dash">
          <path d="M196 120 C 230 120, 236 70, 270 70" />
          <path d="M196 196 C 232 196, 238 238, 270 238" />
        </g>

        {/* Profile card */}
        <g className="anim-float-slow">
          <g filter="url(#sd-shadow)">
            <rect x="20" y="40" width="176" height="236" rx="18" fill="#FCFAF5" />
          </g>
          <circle cx="108" cy="104" r="34" fill="#F2E8D5" />
          <circle cx="108" cy="96" r="12" fill="#75856B" />
          <path d="M84 124 C 88 110, 128 110, 132 124 Z" fill="#75856B" />
          <rect x="62" y="152" width="92" height="9" rx="4.5" fill="#10243A" />
          <rect x="74" y="168" width="68" height="6" rx="3" fill="#657080" fillOpacity="0.5" />
          <line x1="40" x2="176" y1="192" y2="192" stroke="#E3D9C8" />
          {[206, 224, 242].map((y, i) => (
            <g key={y}>
              <circle cx="46" cy={y + 3} r="3.5" fill={i === 1 ? "#F06020" : "#75856B"} />
              <rect x="58" y={y} width={[84, 100, 70][i]} height="6" rx="3" fill="#10243A" fillOpacity="0.25" />
            </g>
          ))}
        </g>

        {/* Attendance grid */}
        <g className="anim-float">
          <g filter="url(#sd-shadow)">
            <rect x="270" y="20" width="190" height="104" rx="16" fill="#1F3B5A" stroke="#fff" strokeOpacity="0.12" />
          </g>
          <text x="288" y="46" fill="#DDD3C2" fontSize="9" letterSpacing="1.4" fontFamily={mono}>
            ATTENDANCE
          </text>
          {Array.from({ length: 21 }, (_, i) => {
            const col = i % 7;
            const row = Math.floor(i / 7);
            const off = i === 9 || i === 17;
            return (
              <rect
                key={i}
                x={288 + col * 22}
                y={58 + row * 19}
                width="13"
                height="13"
                rx="3.5"
                fill={off ? "#F06020" : "#75856B"}
                fillOpacity={off ? 0.9 : 0.8}
              />
            );
          })}
        </g>

        {/* Progress curve */}
        <g className="anim-float-late">
          <g filter="url(#sd-shadow)">
            <rect x="270" y="180" width="190" height="120" rx="16" fill="#F2E8D5" />
          </g>
          <text x="288" y="206" fill="#10243A" fontSize="9" letterSpacing="1.4" fontFamily={mono}>
            PROGRESS
          </text>
          <line x1="288" x2="442" y1="282" y2="282" stroke="#10243A" strokeOpacity="0.15" />
          <path
            d="M290 270 C 312 266, 322 250, 342 248 S 372 236, 392 228 S 424 212, 440 208"
            fill="none"
            stroke="#10243A"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          {[
            [342, 248],
            [392, 228],
            [440, 208],
          ].map(([x, y], i) => (
            <circle key={x} cx={x} cy={y} r="4.5" fill={i === 2 ? "#F06020" : "#FCFAF5"} stroke="#10243A" strokeWidth="1.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}
