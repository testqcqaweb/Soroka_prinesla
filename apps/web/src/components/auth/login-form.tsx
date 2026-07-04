"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/brand/logo";
import { BRAND } from "@/lib/brand";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createClient();

    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-[var(--santa-charcoal)] px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo size="lg" href={null} />
          <div>
            <h1 className="text-2xl font-semibold text-[var(--santa-cream)]">{BRAND.name}</h1>
            <p className="mt-1 text-sm text-[var(--santa-muted)]">{BRAND.tagline}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/8 bg-[var(--santa-charcoal-soft)] p-6">
          <div className="mb-6 flex rounded-lg bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-md py-1.5 text-sm transition-colors ${
                mode === "signin"
                  ? "bg-[var(--santa-crimson)] text-[var(--santa-cream)]"
                  : "text-[var(--santa-muted)]"
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-md py-1.5 text-sm transition-colors ${
                mode === "signup"
                  ? "bg-[var(--santa-crimson)] text-[var(--santa-cream)]"
                  : "text-[var(--santa-muted)]"
              }`}
            >
              Регистрация
            </button>
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-[var(--santa-crimson)]/20 px-3 py-2 text-sm text-[var(--santa-cream)]">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            <Field label="Пароль" name="password" type="password" placeholder="минимум 6 символов" />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--santa-crimson)] px-4 py-2.5 text-sm font-medium text-[var(--santa-cream)] transition-colors hover:bg-[var(--santa-crimson-dark)] disabled:opacity-60"
            >
              {loading ? "Загрузка…" : mode === "signin" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm text-[var(--santa-muted)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-[var(--santa-ink)] px-3 py-2 text-sm outline-none placeholder:text-[var(--santa-muted)]/60 focus:border-[var(--santa-crimson)]"
      />
    </div>
  );
}
