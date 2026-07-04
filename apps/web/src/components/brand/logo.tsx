import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

type LogoProps = {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
};

const sizes = {
  sm: { mark: 28, wordmark: { w: 100, h: 20 } },
  md: { mark: 36, wordmark: { w: 128, h: 26 } },
  lg: { mark: 48, wordmark: { w: 160, h: 32 } },
} as const;

export function SantaProdMark({
  size = "md",
  className = "",
}: {
  size?: LogoProps["size"];
  className?: string;
}) {
  const px = sizes[size ?? "md"].mark;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M8 14C8 10.5 11 8 15 8H28C34 8 38 12 38 17C38 22 34 25 29 26L38 40H28L21 28H18V40H8V14Z"
        fill="var(--santa-crimson)"
      />
      <path
        d="M18 14V22H24C26.5 22 28 20.5 28 18C28 15.5 26.5 14 24 14H18Z"
        fill="var(--santa-cream)"
      />
      <path d="M6 6H16L10 12L6 6Z" fill="var(--santa-cream)" opacity="0.9" />
      <rect x="6" y="4" width="12" height="3" rx="0.5" fill="var(--santa-cream)" />
    </svg>
  );
}

export function Logo({
  variant = "full",
  size = "md",
  href = "/",
  className = "",
}: LogoProps) {
  const content =
    variant === "mark" ? (
      <SantaProdMark size={size} />
    ) : variant === "wordmark" ? (
      <span
        className={`font-semibold tracking-tight ${className}`}
        style={{ fontSize: size === "lg" ? "1.25rem" : size === "sm" ? "0.875rem" : "1rem" }}
      >
        <span className="text-[var(--santa-crimson)]">Santa</span>{" "}
        <span className="text-[var(--santa-cream)]">Prod.</span>
      </span>
    ) : (
      <div className={`flex items-center gap-3 ${className}`}>
        <Image
          src="/santa-prod-logo.png"
          alt={BRAND.name}
          width={size === "lg" ? 160 : size === "sm" ? 100 : 128}
          height={size === "lg" ? 48 : size === "sm" ? 30 : 38}
          className="h-auto w-auto"
          priority
        />
      </div>
    );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label={BRAND.name}>
      {content}
    </Link>
  );
}
