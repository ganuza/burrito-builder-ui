describe("Burrito Page", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'burritoOrders'
    }).as('fetchOrders')
    cy.visit('http://localhost:3000').wait('@fetchOrders')
  })
  it("should show a title, a form with a name input and ingredient buttons, an order summary, a submit button, and 3 burrito orders", () => {
    cy.get('h1').should('contain', 'Burrito Builder')
    cy.get('input').should('have.attr', 'Name')
    cy.get('button').first().should('contain', 'beans')
    cy.get('[name="sour cream"]').should('contain', 'sour cream')
    cy.get('p').should('contain', 'Order: Nothing selected')
    cy.get(':nth-child(15)').should('contain', 'Submit Order')
    cy.get('section').children().should('have.length', 3)
    cy.get('.order').first().should('contain', 'Sue')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('contain', 'beans')
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno')
    cy.get('.order').last().should('contain', 'Pete')
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(1)').should('contain', 'sofritas')
    cy.get(':nth-child(3) > .ingredient-list > :nth-child(5)').should('contain', 'queso fresco')
  });

  it('should allow a user to add a new order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        name: 'Pat',
        ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
      }
    }).as('postOrder')
    cy.get('input').type('Pat').should('have.value', 'Pat')
    cy.get('[name="beans"]').click()
    cy.get('[name="sofritas"]').click()
    cy.get(':nth-child(15)').click().wait('@postOrder')
    cy.get('section').children().should('have.length', 4)
    cy.get('.order').last().should('contain', 'Pat')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(1)').should('contain', 'beans')
    cy.get(':nth-child(4) > .ingredient-list > :nth-child(5)').should('contain', 'jalapeno')
  })

  it('should not do anything if no name and at least one ingredient is submitted', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        name: 'Pat',
        ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
      }
    }).as('postOrder')
    cy.get('input').should('not.have.value')
    cy.get('[name="beans"]').click()
    cy.get(':nth-child(15)').click()
    cy.get('section').children().should('have.length', 3)
  })
});
