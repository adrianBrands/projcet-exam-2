describe("Sign out user", () => {
  it("should navigate to the sing in form, log in an example user, then display the profile page, and then sign out the user", () => {
    cy.visit("/");
    cy.get('[data-cy="profileImage"]').click();
    cy.get('[data-cy="signInBn"]').click();
    cy.fixture("example").then((data) => {
      cy.get('[data-cy="signIn"]').type(data.email);
      cy.get('[data-cy="signInPassword"]').type(data.password);
      cy.get('[data-cy="signInButton"]').click();
      cy.url().should("include", "/profile");
      cy.wait(3000);
    })
    cy.get('[data-cy="profileImage"]').click();
    cy.get('[data-cy="signOut"]').click();
  });
});