import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass"
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

describe("test Button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument(); //希望成功挂在在DOM上
    expect(element.tagName).toEqual("BUTTON"); //希望是个Button
    expect(element).toHaveClass("btn btn-default"); //希望classname正确
    fireEvent.click(element); //调用点击事件
    expect(defaultProps.onClick).toHaveBeenCalled(); //希望成功被调用
  });

  it("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument(); //希望成功挂在在DOM上
    expect(element).toHaveClass("btn-primary btn-lg klass"); //希望classname正确
  });
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(
      <Button btnType="link" href="http://dummyurl">
        Link
      </Button>
    );
    const element = wrapper.getByText("Link");
    expect(element.tagName).toEqual("A"); //希望是个Button
    expect(element).toHaveClass("btn btn-link");
  });
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
