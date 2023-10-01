import React from "react";
import { render, act } from "@testing-library/react";

import Application from "components/Application";



describe("Appointment", () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Application />);
    });
  });

  xit("does something it is supposed to do", () => {
    // Your test code here
  });

  test.skip("does something else it is supposed to do", () => {
    // Your test code here
  });
});