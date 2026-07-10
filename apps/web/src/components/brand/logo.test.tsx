import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Logo, SorokaPrineslaMark } from "@/components/brand/logo";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    "aria-label"?: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Logo", () => {
  it("renders soroka prinesla wordmark", () => {
    render(<Logo href={null} variant="wordmark" />);

    expect(screen.getByText("soroka")).toBeInTheDocument();
    expect(screen.getByText("prinesla")).toBeInTheDocument();
  });

  it("links to home by default", () => {
    render(<Logo variant="wordmark" />);

    expect(screen.getByRole("link", { name: "soroka prinesla" })).toHaveAttribute("href", "/");
  });

  it("renders accessible mark svg", () => {
    const { container } = render(<SorokaPrineslaMark />);
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
