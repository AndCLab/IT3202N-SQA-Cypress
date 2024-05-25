describe('login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it("should show validation errors when leaving all fields blank", () => {
    cy.get('[type="submit"]').click();
    cy.get("input#username:invalid").should("have.length", 1);
    cy.get("#username").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("should show a validation error when leaving only the 'Username' field blank", () => {
    cy.get("#password").type('kimocheese1234');
    cy.get('[type="submit"]').click();
    cy.get("input#username:invalid").should("have.length", 1);
    cy.get("#username").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("should show a validation error when leaving only the 'Password' field blank", () => {
    cy.get("#username").type('kimocheese');
    cy.get('[type="submit"]').click();
    cy.get("input#password:invalid").should("have.length", 1);
    cy.get("#password").then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("should show an error message when the username does not exist", () => {
    cy.get("#username").type('test');
    cy.get("#password").type('1qaz2wsx');
    cy.get('[type="submit"]').click();

    cy.get('.error').should('have.text', 'username not found');
  });

  it("should show an error message when the password is incorrect", () => {
    cy.get("#username").type('tester');
    cy.get("#password").type('123123');
    cy.get('[type="submit"]').click();

    cy.get('.error').should('have.text', 'incorrect password');
  });

  it("should proceed to the Dashboard Page", () => {
    cy.get("#username").type('tester');
    cy.get("#password").type('1qaz2wsx');

    cy.get('[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');
  });
});
