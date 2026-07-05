import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "@/components/portfolio/contact-section";
import { HeroSection } from "@/components/portfolio/hero-section";
import { WorkSection } from "@/components/portfolio/work-section";

describe("HeroSection", () => {
  it("shows name, role and primary actions", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1, name: /Кирилл Сорокин/i })).toBeInTheDocument();
    expect(screen.getByText("Сценарист · Продюсер")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Смотреть проекты" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Написать мне" })).toHaveAttribute("href", "#contact");
    expect(screen.getByText("Открыт к новым проектам")).toBeInTheDocument();
  });
});

describe("WorkSection", () => {
  it("lists featured projects", () => {
    render(<WorkSection />);

    expect(screen.getByRole("heading", { name: /Избранные творческие проекты/i })).toBeInTheDocument();
    expect(screen.getByText("Вайбкодинг")).toBeInTheDocument();
    expect(screen.getByText("Стихи на советской")).toBeInTheDocument();
    expect(screen.getAllByText(/Видео скоро на YouTube/i).length).toBeGreaterThan(0);
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
