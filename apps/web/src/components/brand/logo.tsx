import Link from "next/link";
import { BRAND } from "@/lib/brand";

type LogoProps = {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  onDark?: boolean;
};

const sizes = {
  sm: { mark: 28 },
  md: { mark: 36 },
  lg: { mark: 48 },
} as const;

export function SorokaPrineslaMark({
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
      <circle cx="24" cy="24" r="22" fill="var(--color-1)" opacity="0.35" />
      <path
        d="M10 28C10 20 16 14 24 14C30 14 35 18 36 24C32 22 28 21 24 21C18 21 13 24 10 28Z"
        fill="var(--color-4)"
      />
      <path
        d="M24 14C30 14 35 18 36 24C34 20 30 17 24 17C20 17 16 19 14 22C16 17 20 14 24 14Z"
        fill="var(--color-2)"
      />
      <path
        d="M36 24C38 26 39 29 38 32C35 30 32 28 28 27C32 26 35 25 36 24Z"
        fill="var(--color-3)"
      />
      <circle cx="20" cy="22" r="1.5" fill="var(--color-2)" />
    </svg>
  );
}

function Wordmark({
  size = "md",
  className = "",
  onDark = false,
}: {
  size?: LogoProps["size"];
  className?: string;
  onDark?: boolean;
}) {
  const textSize =
    size === "lg" ? "text-xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <span className={`font-semibold tracking-tight lowercase ${textSize} ${className}`}>
      <span style={{ color: onDark ? "var(--header-title-text)" : "var(--color-4)" }}>
        soroka
      </span>{" "}
      <span style={{ color: onDark ? "var(--header-desc-text)" : "var(--color-3)" }}>
        prinesla
      </span>
    </span>
  );
}

export function Logo({
  variant = "full",
  size = "md",
  href = "/",
  className = "",
  onDark = false,
}: LogoProps) {
  const content =
    variant === "mark" ? (
      <SorokaPrineslaMark size={size} />
    ) : variant === "wordmark" ? (
      <Wordmark size={size} className={className} onDark={onDark} />
    ) : (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <SorokaPrineslaMark size={size} />
        <Wordmark size={size} onDark={onDark} />
      </div>
    );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label={BRAND.name}>
      {content}
    </Link>
  );
}
