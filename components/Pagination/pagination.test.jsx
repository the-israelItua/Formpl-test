import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./index";

describe("Pagination", () => {
  test("renders the correct current page and total pages", () => {
    render(<Pagination page={1} totalItems={31} itemsToShow={15} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("of 3")).toBeInTheDocument();
  });
});
