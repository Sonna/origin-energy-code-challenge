import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { MakePaymentForm } from "./MakePaymentForm";
import { useMakePayment } from "./mutations.openapi";

const mutateMock = jest.fn();
jest.mock("./mutations.openapi", () => ({
  useMakePayment: jest.fn(),
}));

describe("MakePaymentForm", () => {
  const setup = () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isSuccess: false,
      error: null,
    });

    return render(<MakePaymentForm accountId="A-123" />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all input fields", () => {
    const { getByPlaceholderText } = setup();
    expect(getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(getByPlaceholderText("Card Number")).toBeInTheDocument();
    expect(getByPlaceholderText("Expiry")).toBeInTheDocument();
    expect(getByPlaceholderText("CVV")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const { getByRole, getByText } = setup();
    fireEvent.click(getByRole("button", { name: /pay/i }));

    await waitFor(() => {
      expect(getByText(/payment amount must be positive/i)).toBeInTheDocument();
      expect(getByText(/invalid credit card number/i)).toBeInTheDocument();
      expect(
        getByText(/expiry date must be in mm\/yy format/i),
      ).toBeInTheDocument();
      expect(getByText(/cvv must be 3 or 4 digits/i)).toBeInTheDocument();
    });

    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("submits valid form data", async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole } = setup();

    await user.clear(getByPlaceholderText("Amount"));
    await user.type(getByPlaceholderText("Amount"), "100");

    await user.type(getByPlaceholderText("Card Number"), "4111111111111111");
    await user.type(getByPlaceholderText("Expiry"), "12/30");
    await user.type(getByPlaceholderText("CVV"), "123");

    await user.click(getByRole("button", { name: /pay/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith({
        accountId: "A-123",
        amount: 100,
        creditCard: {
          cardNumber: "4111111111111111",
          expiryDate: "12/30",
          cvv: "123",
        },
      });
    });
  });

  it("displays success message when payment succeeds", () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isSuccess: true,
      error: null,
    });

    const { getByText } = render(<MakePaymentForm accountId="A-123" />);
    expect(getByText(/payment successful/i)).toBeInTheDocument();
  });

  it("displays error message on failure", () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isSuccess: false,
      error: new Error("Card declined"),
    });

    const { getByText } = render(<MakePaymentForm accountId="A-123" />);
    expect(getByText(/payment failed: card declined/i)).toBeInTheDocument();
  });

  it("disables button when pending", () => {
    (useMakePayment as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
      isSuccess: false,
      error: null,
    });

    const { getByRole } = render(<MakePaymentForm accountId="A-123" />);
    expect(getByRole("button", { name: /processing/i })).toBeDisabled();
  });
});
