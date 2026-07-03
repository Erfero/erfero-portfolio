import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
}

export default function Marquee({
  items,
  className,
  reverse = false,
  speed = 28,
}: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl sm:text-5xl font-medium text-ink-muted/40 [-webkit-text-stroke:1px_var(--color-border)]"
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
