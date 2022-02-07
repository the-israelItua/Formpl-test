import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./index";

describe("Searchbar", () => {
  test("updates Searchbar field value when value changes", () => {
    render(<SearchBar />);
    const searchbar = screen.getByRole("textbox");
    fireEvent.change(searchbar, { target: { value: "testvalue" } });
    expect(searchbar).toHaveValue("testvalue");
  });

  test("calls the onsearch function when enter key is pressed", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    const searchbar = screen.getByRole("textbox");
    fireEvent.change(searchbar, { target: { value: "testvalue" } });

    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(onSearch).toBeCalled();
  });

  test("doesn't call the onsearch function if enter key is pressed without entring a searchterm", () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(onSearch).not.toBeCalled();
  });
});
