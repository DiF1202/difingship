import React from "react";
import { config } from "react-transition-group";
import { render, RenderResult, fireEvent, waitFor } from "@testing-library/react";
import { AutoComplete, AutoCompleteProps } from "./autoComplete";

config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 }
];
const testProps: AutoCompleteProps = {
  fetchSuggestions: query => {
    return testArray.filter(item => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete"
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
  });
  it("test basic AutoComplete behavior", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    // should have two suggestion items
    // expect(wrapper.container.querySelectorAll(".suggestion-item").length).toEqual(2);
    //click the first item
    // fireEvent.click(wrapper.getByText("ab"));
    // expect(testProps.onSelect).toHaveBeenCalledWith({ value: "ab", number: 11 });
    // expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    //fill the input
    // expect(inputNode.value).toBe("ab");
  });
});
