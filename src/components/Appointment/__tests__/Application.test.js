import React from "react";
import { render, fireEvent, act, waitForElement } from "@testing-library/react";

// import axios from "axios";

import {
  getByText,
  getByTestId,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getAllByAltText
} from "@testing-library/react";
import axios from "__mocks__/axios";

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getAllByAltText(container, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const dayListItemMonday = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    debug();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // Make the axios mock to fail
    axios.put.mockRejectedValueOnce();

    // Render the component.
    const { container } = render(<Application />);
    //  - Get the Add button.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //  - Fill up the form and click the save button.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    //  - Check that the element with the text "Saving" is displayed.
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "New Student Name" }
    });
    fireEvent.click(queryByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //  - Check that the saving error message is shown.

    await waitForElement(() => getByText(appointment, "Error"));

    expect(
      getByText(appointment, "Could not book appointment.")
    ).toBeInTheDocument();
  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    // Mock the delete request to fail
    axios.delete.mockRejectedValueOnce();

    // Render the Application
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // Find an existing appointment and click the delete button
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // Ensure the appointment is found before proceeding
    expect(appointment).toBeInTheDocument();

    // Click the delete button
    const deleteButton = getByAltText(appointment, "Delete");
    fireEvent.click(deleteButton);

    // Confirm deletion
    const confirmButton = getByText(appointment, "Confirm");
    fireEvent.click(confirmButton);

    // Check if the error message is displayed
    const errorMessage = getByText(appointment, "Deleting");
    expect(errorMessage).toBeInTheDocument();

    // Wait until the error message shows up
    await waitForElement(() => getByText(appointment, "Error"));

    // Check that the error message was displayed
    expect(
      getByText(appointment, "Could not cancel appointment.")
    ).toBeInTheDocument();
  });
});
