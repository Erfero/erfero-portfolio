import { cn } from "@/lib/utils";

export default function GradientBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl opacity-40",
        className
      )}
    />
  );
}
