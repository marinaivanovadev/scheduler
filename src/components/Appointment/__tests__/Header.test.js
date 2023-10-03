import React from "react";
import { render} from "@testing-library/react";

import Header from "../Header";

describe("Header Component", () => {
  it("renders with the provided time", () => {
    const time = "10:00 AM";
    const { getByText } = render(<Header time={time} />);

    // Check if the provided time is rendered
    const timeElement = getByText(time);
    expect(timeElement).toBeInTheDocument();
  });

  it("renders a separator", () => {
    const { getByTestId } = render(<Header time="10:00 AM" />);

    // Check if the separator is rendered
    const separatorElement = getByTestId("separator");
    expect(separatorElement).toBeInTheDocument();
  });
});
