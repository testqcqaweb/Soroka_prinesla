import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "@/components/portfolio/contact-section";
import { BackstageReveal } from "@/components/portfolio/backstage-reveal";
import { HeroSection } from "@/components/portfolio/hero-section";
import { WorkSection } from "@/components/portfolio/work-section";

describe("HeroSection", () => {
  it("shows name, role and primary actions", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1, name: /Кирилл Сорокин/i })).toBeInTheDocument();
    expect(screen.getByText(/Сценарист · Продюсер · Менеджер по продажам/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Смотреть проекты" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Написать мне" })).toHaveAttribute("href", "#contact");
    expect(screen.getByText("Открыт к новым проектам")).toBeInTheDocument();
    expect(screen.getByLabelText("Сцены из фильма")).toBeInTheDocument();
  });
});

describe("WorkSection", () => {
  it("lists featured projects with illustrations and links", () => {
    render(<WorkSection />);

    expect(screen.getByRole("heading", { name: /Избранные творческие проекты/i })).toBeInTheDocument();
    expect(screen.getByText("Вайбкодинг")).toBeInTheDocument();
    expect(screen.getByText("Стихи на советской")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Следующее фото/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("img", { name: /Иллюстрация проекта «Вайбкодинг»/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Репозиторий на GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/testqcqaweb/Soroka_prinesla",
    );
    expect(screen.getAllByRole("link", { name: /Instagram/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Открыть сборник \(PDF\)/i })).toHaveAttribute(
      "href",
      "/books/stih-yest.pdf",
    );
    expect(screen.getByRole("link", { name: /Смотреть клип/i })).toHaveAttribute("href", "/video/bulvar.mp4");
  });
});

describe("ContactSection", () => {
  it("shows contact channels without duplicate handle line", () => {
    render(<ContactSection />);

    expect(screen.getByRole("heading", { name: "Кирилл Сорокин" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "testqcqaweb@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:testqcqaweb@gmail.com",
    );
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/sorokaprineslaa",
    );
    expect(screen.getAllByText("@sorokaprineslaa")).toHaveLength(1);
    expect(screen.getByText("Брест, Беларусь")).toBeInTheDocument();
  });
});

describe("BackstageReveal", () => {
  it("shows behind-the-scenes copy", () => {
    render(<BackstageReveal />);

    expect(screen.getByRole("region", { name: "За кулисами" })).toBeInTheDocument();
    expect(screen.getByText("Всё, из чего собирается работа")).toBeInTheDocument();
  });
});
