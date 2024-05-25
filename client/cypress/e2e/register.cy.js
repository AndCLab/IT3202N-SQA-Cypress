describe("register page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it("should show validation errors when leaving all fields blank,", () => {
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

  it("should show an error message when the username is already taken", () => {
    cy.get("#username").type('tester');
    cy.get("#password").type('1qaz2wsx');
    cy.get('[type="submit"]').click();

    cy.get('.error').should('have.text', 'username already taken');
  });

  it("should show an error message when the username is below the minimum required length", () => {
    cy.get("#username").type('hi');
    cy.get("#password").type('123456');
    cy.get('[type="submit"]').click();

    cy.get('.error').should('have.text', 'Validation failed');
  });

  it("should show an error message when the password is below the minimum required length", () => {
    cy.get("#username").type('registertest0');
    cy.get("#password").type('12345');
    cy.get('[type="submit"]').click();

    cy.get('.error').should('have.text', 'Validation failed');
  });

  it("should create a new account and be able to login with the new account", () => {
    const randomizer = Math.floor(Math.random() * 999)
    
    cy.get("#username").type(`registertest${randomizer}`);
    cy.get("#password").type('123456');

    cy.get('[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/login');

    cy.get("#username").type(`registertest${randomizer}`);
    cy.get("#password").type('123456');

    cy.get('[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');
  });
});
