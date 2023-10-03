import React from "react";
import { render, waitForElement, fireEvent, act } from "@testing-library/react";
import {
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

describe("Appointment", () => {
  it("changes the schedule when a new day is selected", async () => {
    await act(async () => {
      const { getByText } = render(<Application />);

      await waitForElement(() => getByText("Monday"));

      fireEvent.click(getByText("Tuesday"));

      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview, shows 'Saving' status, and displays student's name", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});
