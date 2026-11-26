/**
 * About page illustration for "We Turn Ideas into Digital Solutions":
 * a dashed sketch (the idea) becomes a finished interface (the solution),
 * joined by a flowing line. Original SVG; decorative (aria-hidden).
 */
export function IdeaToSolution({ className }: { className?: string }) {
  const mono = "ui-monospace, Consolas, monospace";
  return (
    <svg viewBox="0 0 520 260" aria-hidden className={className}>
      {/* Idea: dashed wireframe */}
      <g className="anim-float-slow">
        <rect x="14" y="44" width="170" height="170" rx="18" fill="none" stroke="#F2E8D5" strokeOpacity="0.55" strokeDasharray="5 6" />
        <rect x="34" y="68" width="74" height="8" rx="4" fill="#F2E8D5" fillOpacity="0.35" />
        <rect x="34" y="86" width="120" height="44" rx="8" fill="none" stroke="#F2E8D5" strokeOpacity="0.4" strokeDasharray="4 5" />
        <path d="M40 152 q 18 -18 36 0 t 36 0 t 36 0" fill="none" stroke="#F2E8D5" strokeOpacity="0.45" strokeWidth="1.5" />
        <circle cx="48" cy="186" r="8" fill="none" stroke="#F06020" strokeOpacity="0.8" strokeDasharray="3 3" />
        <text x="14" y="32" fill="#DDD3C2" fontSize="10" letterSpacing="1.6" fontFamily={mono}>
          IDEA
        </text>
      </g>

      {/* Flow */}
      <path d="M190 130 C 236 130, 260 112, 318 112" fill="none" stroke="#F06020" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d="M190 130 C 236 130, 260 112, 318 112" fill="none" stroke="#F06020" strokeWidth="1.75" className="anim-dash" />
      <circle cx="190" cy="130" r="4.5" fill="#10243A" stroke="#F06020" strokeWidth="1.5" />

      {/* Solution: finished interface */}
      <g className="anim-float">
        <rect x="330" y="22" width="176" height="210" rx="20" fill="#F06020" fillOpacity="0.12" />
        <rect x="322" y="14" width="176" height="210" rx="20" fill="#FCFAF5" />
        <path d="M322 34a20 20 0 0 1 20-20h136a20 20 0 0 1 20 20v8H322z" fill="#1A3350" />
        <circle cx="340" cy="28" r="3" fill="#F06020" />
        <circle cx="350" cy="28" r="3" fill="#fff" fillOpacity="0.35" />
        <rect x="338" y="58" width="144" height="54" rx="10" fill="#F2E8D5" />
        <rect x="350" y="70" width="70" height="8" rx="4" fill="#10243A" />
        <rect x="350" y="84" width="96" height="5" rx="2.5" fill="#10243A" fillOpacity="0.35" />
        <rect x="350" y="95" width="34" height="9" rx="4.5" fill="#F06020" />
        {[126, 150, 174].map((y) => (
          <g key={y}>
            <rect x="338" y={y} width="144" height="16" rx="6" fill="#10243A" fillOpacity="0.05" />
            <circle cx="349" cy={y + 8} r="3.5" fill="#75856B" />
            <rect x="358" y={y + 6} width="78" height="4" rx="2" fill="#10243A" fillOpacity="0.4" />
          </g>
        ))}
        <circle cx="478" cy="208" r="12" fill="#10243A" />
        <path d="M472 208 l4 4 l8 -9" fill="none" stroke="#F06020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="322" y="252" fill="#DDD3C2" fontSize="10" letterSpacing="1.6" fontFamily={mono}>
          DIGITAL SOLUTION
        </text>
      </g>
    </svg>
  );
}
