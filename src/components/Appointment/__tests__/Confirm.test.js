import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Confirm from "../Confirm";

describe("Confirm Component", () => {
  it("renders with message and buttons", () => {
    const message = "Are you sure?";
    const onCancelMock = jest.fn();
    const onConfirmMock = jest.fn();

    const { getByText } = render(
      <Confirm
        message={message}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
      />
    );

    // Check if the message is rendered
    const messageElement = getByText(message);
    expect(messageElement).toBeInTheDocument();

    // Check if Cancel and Confirm buttons are rendered
    const cancelButton = getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    const confirmButton = getByText("Confirm");
    expect(confirmButton).toBeInTheDocument();
  });

  it("calls onCancel and onConfirm functions when buttons are clicked", () => {
    const onCancelMock = jest.fn();
    const onConfirmMock = jest.fn();

    const { getByText } = render(
      <Confirm
        message="Are you sure?"
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
      />
    );

    // Click Cancel button
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCancelMock).toHaveBeenCalledTimes(1);

    // Click Confirm button
    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
