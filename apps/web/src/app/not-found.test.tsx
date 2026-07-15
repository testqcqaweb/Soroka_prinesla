import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFoundPage from "@/app/not-found";

describe("NotFoundPage", () => {
  it("shows poetic 404 message and home actions", () => {
    render(<NotFoundPage />);

    expect(screen.getByRole("heading", { level: 1, name: "404" })).toBeInTheDocument();
    expect(screen.getByText(/Сорока принесла/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /На главную/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Смотреть проекты/i })).toHaveAttribute("href", "/#work");
  });
});
