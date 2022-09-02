describe("smoke tests", () => {
  it("should allow you to write text on the search bar", () => {
    cy.visitAndCheck("/");
    cy.get("#search-dropdown").type("this is a test", { force: true });
  });
});
