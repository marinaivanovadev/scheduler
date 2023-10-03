import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Error from "../Error";

describe("Error Component", () => {
  it("renders with error message and close button", () => {
    const errorMessage = "Something went wrong!";
    const onCloseMock = jest.fn();

    const { getByText, getByAltText } = render(
      <Error message={errorMessage} onClose={onCloseMock} />
    );

    // Check if the error message is rendered
    const errorMessageElement = getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();

    // Check if the close button is rendered
    const closeButton = getByAltText("Close");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClose function when close button is clicked", () => {
    const onCloseMock = jest.fn();

    const { getByAltText } = render(
      <Error message="Error message" onClose={onCloseMock} />
    );

    // Click the close button
    const closeButton = getByAltText("Close");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
