import React from "react";
import { render } from "@testing-library/react";
import Status from "../Status";

describe("Status Component", () => {
  it("renders with the provided message", () => {
    const message = "Loading...";
    const { getByText } = render(<Status message={message} />);

    // Check if the provided message is rendered
    const messageElement = getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the status image", () => {
    const { getByAltText } = render(<Status message="Loading..." />);

    // Check if the status image is rendered
    const imageElement = getByAltText("Loading");
    expect(imageElement).toBeInTheDocument();
  });
});
