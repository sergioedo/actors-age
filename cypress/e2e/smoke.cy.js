describe("smoke tests", () => {
  it("should allow you to write text on the search bar", () => {
    cy.visitAndCheck("/");
    cy.get("#simple-search").type("this is a test");
  });
});
