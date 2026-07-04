"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";

const PUBLIC_PATHS = ["/login"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (!configured || loading) return;

    if (!user && !isPublic) {
      router.replace("/login");
      return;
    }

    if (user && pathname === "/login") {
      router.replace("/");
    }
  }, [user, loading, configured, isPublic, pathname, router]);

  if (!configured) return children;

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[var(--santa-charcoal)] text-[var(--santa-muted)]">
        Загрузка…
      </div>
    );
  }

  if (!user && !isPublic) return null;

  return children;
}
