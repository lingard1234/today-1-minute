import { CSSProperties, ReactElement } from "react";

interface CategoryArtProps {
  category: string;
  style?: CSSProperties;
}

interface CategoryStyle {
  gradient: string;
  icon: (color: string) => ReactElement;
}

const CATEGORY_STYLE: Record<string, CategoryStyle> = {
  날씨: {
    gradient: "linear-gradient(135deg, #60A5FA 0%, #38BDF8 55%, #FDE68A 100%)",
    icon: (color) => (
      <>
        <circle cx="38" cy="36" r="15" fill={color} opacity={0.9} />
        <path
          d="M20 68a14 14 0 0 1 12-13.9A18 18 0 0 1 66 46a12 12 0 0 1-2 22H26a10 10 0 0 1-6-4Z"
          fill={color}
          opacity={0.55}
        />
      </>
    ),
  },
  경제: {
    gradient: "linear-gradient(135deg, #34D399 0%, #10B981 55%, #065F46 100%)",
    icon: (color) => (
      <>
        <rect x="22" y="52" width="12" height="24" rx="2" fill={color} opacity={0.85} />
        <rect x="44" y="38" width="12" height="38" rx="2" fill={color} opacity={0.85} />
        <rect x="66" y="24" width="12" height="52" rx="2" fill={color} opacity={0.85} />
      </>
    ),
  },
  IT: {
    gradient: "linear-gradient(135deg, #818CF8 0%, #6366F1 55%, #312E81 100%)",
    icon: (color) => (
      <>
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          rx="8"
          fill="none"
          stroke={color}
          strokeWidth={4}
          opacity={0.85}
        />
        <rect x="42" y="42" width="16" height="16" rx="3" fill={color} opacity={0.85} />
        <path
          d="M30 44h-8M30 56h-8M70 44h8M70 56h8M44 30v-8M56 30v-8M44 70v8M56 70v8"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.85}
        />
      </>
    ),
  },
  사회: {
    gradient: "linear-gradient(135deg, #94A3B8 0%, #64748B 55%, #1E293B 100%)",
    icon: (color) => (
      <>
        <rect x="22" y="36" width="18" height="40" fill={color} opacity={0.85} />
        <rect x="46" y="22" width="18" height="54" fill={color} opacity={0.92} />
        <rect x="70" y="44" width="14" height="32" fill={color} opacity={0.8} />
      </>
    ),
  },
  문화: {
    gradient: "linear-gradient(135deg, #F472B6 0%, #C084FC 55%, #7C3AED 100%)",
    icon: (color) => (
      <>
        <circle cx="50" cy="50" r="22" fill="none" stroke={color} strokeWidth={4} opacity={0.85} />
        <circle cx="50" cy="34" r="4" fill={color} opacity={0.9} />
        <circle cx="66" cy="50" r="4" fill={color} opacity={0.9} />
        <circle cx="50" cy="66" r="4" fill={color} opacity={0.9} />
        <circle cx="34" cy="50" r="4" fill={color} opacity={0.9} />
      </>
    ),
  },
  스포츠: {
    gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 55%, #C2410C 100%)",
    icon: (color) => (
      <>
        <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth={4} opacity={0.85} />
        <path
          d="M50 26v48M26 50h48M35 35l30 30M65 35 35 65"
          stroke={color}
          strokeWidth={3}
          opacity={0.5}
        />
      </>
    ),
  },
};

const DEFAULT_STYLE: CategoryStyle = {
  gradient: "linear-gradient(135deg, #94A3B8 0%, #475569 100%)",
  icon: (color) => (
    <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth={4} opacity={0.85} />
  ),
};

/** 저작권 걱정 없이 기사 카테고리와 어울리는 일러스트를 그려주는 컴포넌트. */
export function CategoryArt({ category, style }: CategoryArtProps) {
  const config = CATEGORY_STYLE[category] ?? DEFAULT_STYLE;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: config.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <svg width="44%" height="44%" viewBox="0 0 100 100">
        {config.icon("#FFFFFF")}
      </svg>
    </div>
  );
}
