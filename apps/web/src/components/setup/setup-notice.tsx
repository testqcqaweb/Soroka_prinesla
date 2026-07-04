export function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-xl border border-[var(--santa-crimson)]/30 bg-[var(--santa-charcoal-soft)] p-6">
      <h2 className="text-lg font-medium text-[var(--santa-cream)]">Нужна настройка Firebase</h2>
      <p className="text-sm text-[var(--santa-muted)]">
        Скопируйте <code className="text-[var(--santa-cream)]">.env.example</code> в{" "}
        <code className="text-[var(--santa-cream)]">.env.local</code> и укажите ключи из
        Firebase Console. Затем задеплойте правила Firestore.
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--santa-muted)]">
        <li>Создайте проект на console.firebase.google.com</li>
        <li>Добавьте Web-приложение → скопируйте config в .env.local</li>
        <li>Authentication → включите Email/Password</li>
        <li>Firestore → создайте базу данных</li>
        <li>
          Задеплойте правила:{" "}
          <code className="text-[var(--santa-cream)]">
            npx -y firebase-tools@latest deploy --only firestore
          </code>
        </li>
        <li>Перезапустите npm run dev</li>
      </ol>
    </div>
  );
}
