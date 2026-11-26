import { cn } from "@/lib/cn";

/**
 * Editorial illustrations for the four services (original SVG, brand
 * palette, no external images). Each has one small hover detail driven by
 * the parent card's `group` class. Decorative (aria-hidden).
 */
const NAVY = "#10243A";
const ORANGE = "#F06020";
const SAGE = "#75856B";
const CREAM = "#F2E8D5";
const LINE = "#E3D9C8";
const WARM = "#FCFAF5";

const move = "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

function Website() {
  return (
    <>
      <rect x="48" y="40" width="240" height="146" rx="12" fill={NAVY} fillOpacity="0.06" />
      <rect x="40" y="30" width="240" height="146" rx="12" fill="#fff" stroke={NAVY} strokeOpacity="0.14" />
      <path d="M40 42a12 12 0 0 1 12-12h216a12 12 0 0 1 12 12v8H40z" fill={NAVY} />
      {[54, 64, 74].map((x, i) => (
        <circle key={x} cx={x} cy="40" r="3" fill={i === 0 ? ORANGE : "#fff"} fillOpacity={i === 0 ? 1 : 0.35} />
      ))}
      <rect x="92" y="36" width="120" height="8" rx="4" fill="#fff" fillOpacity="0.12" />
      <rect x="54" y="62" width="212" height="56" rx="8" fill={CREAM} />
      <rect x="66" y="74" width="92" height="9" rx="4.5" fill={NAVY} />
      <rect x="66" y="89" width="64" height="6" rx="3" fill={NAVY} fillOpacity="0.35" />
      <rect x="66" y="101" width="40" height="10" rx="5" fill={ORANGE} />
      <rect x="196" y="72" width="58" height="36" rx="6" fill={SAGE} fillOpacity="0.55" />
      {[54, 126, 198].map((x) => (
        <g key={x}>
          <rect x={x} y="128" width="68" height="36" rx="6" fill={WARM} stroke={LINE} />
          <rect x={x + 8} y="138" width="36" height="5" rx="2.5" fill={NAVY} fillOpacity="0.5" />
          <rect x={x + 8} y="148" width="48" height="4" rx="2" fill={NAVY} fillOpacity="0.2" />
        </g>
      ))}
      {/* responsive: phone frame */}
      <rect x="250" y="112" width="44" height="78" rx="9" fill="#fff" stroke={NAVY} strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="256" y="122" width="32" height="18" rx="4" fill={CREAM} />
      <rect x="256" y="146" width="32" height="6" rx="3" fill={NAVY} fillOpacity="0.25" />
      <rect x="256" y="158" width="20" height="8" rx="4" fill={ORANGE} />
      {/* cursor */}
      <g className={cn(move, "group-hover:-translate-x-[38px] group-hover:-translate-y-[34px]")}>
        <path d="M120 140 l0 22 l6 -6 l5 11 l5 -2 l-5 -11 l8 0 z" fill={NAVY} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </>
  );
}

function Mobile() {
  return (
    <>
      <g transform="rotate(-9 128 108)">
        <rect x="86" y="28" width="84" height="156" rx="16" fill={SAGE} fillOpacity="0.3" />
        <rect x="92" y="34" width="72" height="144" rx="12" fill={CREAM} />
        {[50, 82, 114].map((y) => (
          <rect key={y} x="100" y={y} width="56" height="24" rx="6" fill="#fff" />
        ))}
      </g>
      <g className={cn(move, "group-hover:-translate-y-2")}>
        <rect x="150" y="24" width="92" height="166" rx="18" fill={NAVY} />
        <rect x="157" y="31" width="78" height="152" rx="13" fill="#1A3350" />
        <rect x="182" y="36" width="28" height="5" rx="2.5" fill={NAVY} />
        <rect x="164" y="50" width="64" height="44" rx="9" fill={CREAM} />
        <rect x="171" y="58" width="32" height="6" rx="3" fill={NAVY} />
        <rect x="171" y="69" width="46" height="4" rx="2" fill={NAVY} fillOpacity="0.35" />
        <rect x="171" y="79" width="24" height="9" rx="4.5" fill={ORANGE} />
        {[102, 122, 142].map((y) => (
          <g key={y}>
            <rect x="164" y={y} width="64" height="15" rx="5" fill="#fff" fillOpacity="0.09" />
            <circle cx="172" cy={y + 7.5} r="3" fill={SAGE} />
            <rect x="179" y={y + 6} width="36" height="3.5" rx="1.75" fill="#fff" fillOpacity="0.45" />
          </g>
        ))}
        <circle cx="216" cy="168" r="9" fill={ORANGE} />
        <path d="M212 168h8M216 164v8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <g className={cn(move, "group-hover:translate-x-1")}>
        <rect x="232" y="56" width="62" height="26" rx="13" fill="#fff" stroke={LINE} />
        <circle cx="246" cy="69" r="5" fill={ORANGE} />
        <rect x="256" y="66" width="28" height="5" rx="2.5" fill={NAVY} fillOpacity="0.5" />
      </g>
    </>
  );
}

function BusinessSoftware() {
  return (
    <>
      <rect x="28" y="26" width="230" height="150" rx="12" fill="#fff" stroke={NAVY} strokeOpacity="0.14" />
      <path d="M28 38a12 12 0 0 1 12-12h40v150H40a12 12 0 0 1-12-12z" fill={NAVY} />
      {[46, 64, 82, 100].map((y, i) => (
        <rect key={y} x="40" y={y} width={i === 0 ? 30 : 26} height="6" rx="3" fill={i === 0 ? ORANGE : "#fff"} fillOpacity={i === 0 ? 1 : 0.35} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={96 + i * 15} y={86 - [16, 26, 20, 34, 28][i]} width="9" height={[16, 26, 20, 34, 28][i]} rx="2" fill={i === 3 ? ORANGE : SAGE} fillOpacity={i === 3 ? 1 : 0.6} />
      ))}
      <rect x="182" y="44" width="62" height="42" rx="7" fill={CREAM} />
      <rect x="190" y="53" width="30" height="5" rx="2.5" fill={NAVY} fillOpacity="0.5" />
      <rect x="190" y="64" width="44" height="9" rx="4.5" fill={NAVY} />
      {[100, 118, 136, 154].map((y, i) => (
        <g key={y}>
          <line x1="94" x2="246" y1={y - 5} y2={y - 5} stroke={LINE} />
          <rect x="96" y={y} width="60" height="5" rx="2.5" fill={NAVY} fillOpacity="0.4" />
          <rect x="176" y={y} width="30" height="5" rx="2.5" fill={NAVY} fillOpacity="0.2" />
          <circle cx="234" cy={y + 2.5} r="3.5" fill={[SAGE, ORANGE, SAGE, LINE][i]} />
        </g>
      ))}
      {/* billing document */}
      <g className={cn(move, "group-hover:-translate-x-2 group-hover:-translate-y-1")}>
        <rect x="222" y="90" width="76" height="98" rx="9" fill={WARM} stroke={NAVY} strokeOpacity="0.22" />
        <rect x="232" y="100" width="14" height="14" rx="4" fill={NAVY} />
        <rect x="252" y="103" width="34" height="5" rx="2.5" fill={NAVY} fillOpacity="0.55" />
        {[124, 134, 144].map((y) => (
          <rect key={y} x="232" y={y} width="54" height="4" rx="2" fill={NAVY} fillOpacity="0.2" />
        ))}
        <line x1="232" x2="286" y1="156" y2="156" stroke={LINE} />
        <rect x="258" y="164" width="28" height="8" rx="4" fill={ORANGE} />
      </g>
    </>
  );
}

function DesignArt() {
  return (
    <>
      <rect x="30" y="26" width="196" height="150" rx="12" fill="#fff" stroke={NAVY} strokeOpacity="0.14" />
      {/* artboard grid */}
      <g stroke={NAVY} strokeOpacity="0.06">
        {[46, 66, 86, 106, 126, 146, 166].map((y) => (
          <line key={y} x1="30" x2="226" y1={y} y2={y} />
        ))}
      </g>
      <rect x="44" y="40" width="70" height="44" rx="8" fill={CREAM} />
      <rect x="52" y="50" width="38" height="6" rx="3" fill={NAVY} />
      <rect x="52" y="62" width="50" height="4" rx="2" fill={NAVY} fillOpacity="0.35" />
      <rect x="52" y="71" width="22" height="7" rx="3.5" fill={ORANGE} />
      <rect x="124" y="40" width="88" height="20" rx="10" fill={NAVY} />
      <rect x="124" y="66" width="88" height="20" rx="10" fill="#fff" stroke={NAVY} strokeOpacity="0.3" />
      {/* bezier */}
      <path d="M50 150 C 90 98, 140 176, 200 116" fill="none" stroke={NAVY} strokeWidth="2.25" />
      <g className={cn(move, "group-hover:translate-x-1.5 group-hover:-translate-y-1.5")}>
        <line x1="90" y1="98" x2="50" y2="150" stroke={ORANGE} strokeOpacity="0.6" />
        <circle cx="90" cy="98" r="4" fill="#fff" stroke={ORANGE} strokeWidth="1.5" />
      </g>
      <line x1="140" y1="176" x2="200" y2="116" stroke={ORANGE} strokeOpacity="0.6" />
      <rect x="46" y="146" width="8" height="8" fill="#fff" stroke={NAVY} strokeWidth="1.5" />
      <rect x="196" y="112" width="8" height="8" fill="#fff" stroke={NAVY} strokeWidth="1.5" />
      <circle cx="140" cy="176" r="4" fill="#fff" stroke={ORANGE} strokeWidth="1.5" />
      {/* swatches */}
      <g className={cn(move, "group-hover:-translate-y-1")}>
        <rect x="240" y="30" width="52" height="132" rx="10" fill="#fff" stroke={LINE} />
        {[NAVY, ORANGE, SAGE, CREAM].map((c, i) => (
          <rect key={c} x="250" y={42 + i * 28} width="32" height="20" rx="5" fill={c} stroke={c === CREAM ? LINE : "none"} />
        ))}
      </g>
      {/* pen nib */}
      <g transform="translate(232 168) rotate(-35)">
        <path d="M0 0 l9 -22 l9 22 l-9 8 z" fill={NAVY} />
        <circle cx="9" cy="-6" r="2" fill={ORANGE} />
      </g>
    </>
  );
}

const arts: Record<string, () => React.ReactElement> = {
  "website-development": Website,
  "mobile-applications": Mobile,
  "business-software": BusinessSoftware,
  "ui-ux-product-design": DesignArt,
};

export function ServiceArt({ slug, className }: { slug: string; className?: string }) {
  const Art = arts[slug];
  if (!Art) return null;
  return (
    <svg viewBox="0 0 320 210" aria-hidden className={cn("h-auto w-full overflow-visible", className)}>
      <Art />
    </svg>
  );
}
