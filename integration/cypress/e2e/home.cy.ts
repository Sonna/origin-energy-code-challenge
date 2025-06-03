describe("home page", () => {
  it("passes", () => {
    cy.visit("/");
  });

  // ✅ Implement a page that renders a list of customer energy accounts.
  it("renders a list of customer energy accounts", () => {
    cy.visit("/");

    cy.get('[data-automation="energy-account-card"]').should("exist");

    // ✅ Fetch energy accounts from the backend.
    cy.contains("ELECTRICITY").should("exist");
    cy.contains("A-0001").should("exist");
    cy.contains("1 Greville Ct, Thomastown, 3076, Victoria").should("exist");
    cy.contains("Amount Due:").should("exist");
    cy.contains("$30.00").should("exist");
  });

  // ✅ The account balance should change color based on the value:
  it("renders account balance should change color based on the value", () => {
    cy.visit("/");

    // - Positive: green
    cy.contains("$-40.00").should("have.class", "text-success");
    // - Negative: red
    cy.contains("$30.00").should("have.class", "text-danger");
    // - Zero: grey
    cy.contains("$0.00").should("have.class", "text-muted");
  });

  // ✅ Implement a filter for filtering accounts by energy type.
  it("renders filtering accounts by energy type", () => {
    cy.visit("/");

    // - All
    cy.contains("ELECTRICITY").should("exist");
    cy.contains("GAS").should("exist");

    // - ELECTRICITY
    cy.get("label[for='tab-Electricity']").click();
    cy.contains("ELECTRICITY").should("exist");
    cy.contains("GAS").should("not.exist");

    // - GAS
    cy.get("label[for='tab-Gas']").click();
    cy.contains("ELECTRICITY").should("not.exist");
    cy.contains("GAS").should("exist");
  });

  // ✅ Clicking on the "Make a Payment" button should open a modal with:
  it("renders payment modal and makes a payment", () => {
    cy.visit("/");

    // - title
    cy.contains("Make a Payment").should("exist").click();
    cy.contains("$30.00").should("exist");

    // - credit card details
    cy.get('input[name="creditCard.cardNumber"]')
      .should("exist")
      .type("4111111111111111");
    cy.get('input[name="creditCard.expiryDate"]').should("exist").type("12/37");
    cy.get('input[name="creditCard.cvv"]').should("exist").type("423");

    // - balance
    cy.get('input[name="amount"]').should("exist").type("50");

    // - A "Pay" button
    cy.get("button").contains("Pay").should("exist");

    // ✅ Clicking the "Pay" button should submit the credit card details to the backend, and on success, show a “Payment Successful” view with a close button.
    cy.get("button").contains("Pay").click();
    cy.contains("$-20.00").should("exist");
  });

  // ✅ Implement a different page/view that shows a history of payments made.
  it("renders a history of payments", () => {
    // TODO
    cy.visit("/");
  });

  // ✅ Implement a search feature to search by account address.
  it("renders a search feature and filters by account address", () => {
    cy.visit("/");

    // verify accounts exist before fitlering
    cy.contains("1 Greville Ct, Thomastown, 3076, Victoria").should("exist");
    cy.contains("3 Ocean View Dr, Torquay, 3228, Victoria").should("exist");

    cy.get('input[name="search"]').should("exist").type("Torquay");

    cy.contains("1 Greville Ct, Thomastown, 3076, Victoria").should(
      "not.exist",
    );
    cy.contains("3 Ocean View Dr, Torquay, 3228, Victoria").should("exist");

    // reset search results
    cy.get("button").contains("Clear").should("exist").click();
    cy.contains("1 Greville Ct, Thomastown, 3076, Victoria").should("exist");
    cy.contains("3 Ocean View Dr, Torquay, 3228, Victoria").should("exist");
  });
});
