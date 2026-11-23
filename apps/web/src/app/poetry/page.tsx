const POEMS: Array<{ title: string; text: string }> = [
  {
    title: "Вы встретились недавно, снова",
    text: `Вы встретились недавно, снова.
И очень быстро стало ясно,
Что эта встреча не с простого,
Для жизни - разной, словно пластырь.

Она теперь хранить вас будет
Точнее, вы её храните!
Смотреть, муж, будешь за невестой!
А за тобой ... присмотрит Бог.

Всегда в сочувствии дышите,
И в соучастии друг с другом.
Постройте дом, детей родите,
Банально, ну а счастье в чем?
Забыл:
П.С. И побывать, конечно за границей.

Вам повезло влюбиться, дети,
Вы всё, и все, муж и жена.
А дом построите, конечно,
Начнёте с крыш и чердака.

Поздравляю вас со свадьбой. Крепко обнимаю.`,
  },
  {
    title: "«Дождь по стеклу — как сосед по коммуналке»",
    text: `Дождь по стеклу — как сосед по коммуналке:
пришёл и не уходит.

Сижу в тишине, чай остыл,
а я всё жду, что кто-то позвонит.
Никто не звонит. Хорошо.

Всё проходит, даже это.
Дажд дождь.

Кирилл Сорокин`,
  },
  {
    title: "«Сидел в тишине»",
    text: `Сидел в тишине.
За окном ливень —
будто наверху опрокинули ведро.

Душа грустит.
Всё проходит, даже это.
Даже ведро однажды кончится.

С потолка капает.
Подставил таз.
За вечер — единственное полезное дело.

Кирилл Сорокин`,
  },
];

export default function PoetryPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const displayFont = { fontFamily: "var(--font-playfair), serif" };
  const bodyStyle = { fontFamily: "var(--font-geist-mono)", fontSize: "0.875rem" };

  return (
    <section className="section-padding border-t border-white/8">
      <div className="container-wide">
        <header className="border-b border-white/8 pb-6">
          <h1 className="text-5xl font-normal tracking-tight text-[var(--brand-cream)]" style={displayFont}>
            Стихи
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--brand-muted)]">
            Книга «Стих есть» (2024, Брест), примеры стихов — и его цифровой двойник,
            который пишет в Telegram.
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {POEMS.map((poem) => (
            <article key={poem.title} className="border-t border-white/8 pt-8">
              <h2 className="text-xl font-medium text-[var(--brand-cream)]" style={displayFont}>
                {poem.title}
              </h2>
              <pre
                className="mt-4 whitespace-pre-wrap leading-relaxed text-[var(--brand-cream)]/80"
                style={bodyStyle}
              >
                {poem.text}
              </pre>
            </article>
          ))}
        </div>

        <section className="mt-12 border-t border-white/8 pt-8">
          <h2 className="text-xl font-medium text-[var(--brand-cream)]" style={displayFont}>
            Книга — «Стих есть»
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--brand-muted)]">
            Книга-сборник поэзии Кирилла Сорокина, Брест, 2024.{" "}
            <a href={`${basePath}/books/stih-yest.pdf`} className="underline-offset-2 underline">
              Скачать PDF
            </a>
          </p>
        </section>

        <section className="mt-12 border-t border-white/8 pt-8">
          <h2 className="text-xl font-medium text-[var(--brand-cream)]" style={displayFont}>
            Пишу в Telegram — @sorokaprinesla_ai
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--brand-muted)]">
            Цифровой двойник: присылай тему или историю — получи стих в чате
            (обучен на моих стихах и разговорах). Личные заказы
            (стихи, свадьбы, церемониальные речи) — кнопка в боте.
          </p>
          <p className="mt-3">
            <a
              href="https://t.me/sorokaprinesla_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 underline"
            >
              Открыть бота
            </a>
          </p>
        </section>
      </div>
    </section>
  );
}
