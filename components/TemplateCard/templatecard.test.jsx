import { render, screen } from "@testing-library/react";
import TemplateCard from "./index";

describe("TemplateCard", () => {
  test("renders the correct template card name", () => {
    let item = {
      name: "mock name",
      description: "mock description",
      link: "mocklink.com",
    };
    render(<TemplateCard item={item} />);
    const name = screen.getByText("mock name");
    expect(name).toBeInTheDocument();
  });

  test("renders the correct template card description", () => {
    let item = {
      name: "mock name",
      description: "mock description",
      link: "mocklink.com",
    };
    render(<TemplateCard item={item} />);
    const description = screen.getByText("mock description");
    expect(description).toBeInTheDocument();
  });

  test("renders the correct template card link", () => {
    let item = {
      name: "mock name",
      description: "mock description",
      link: "http://localhost:3000/",
    };
    render(<TemplateCard item={item} />);
    const link = screen.getByText("Use Template");
    expect(link.closest("a")).toHaveAttribute("href", "http://localhost:3000/");
  });
});
