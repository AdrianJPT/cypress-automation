// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import CartPage from "./pageObjects/cartPage"
const cartPage = new CartPage()

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.intercept('get', 'https://magento.softwaretestingboard.com/customer/account/').as('apiLogin');

    cy.visit('https://magento.softwaretestingboard.com/customer/account/login')
    cy.get('#email').type(email)
    cy.get('#pass').type(password)
    cy.get('#send2').click()

    cy.wait('@apiLogin').then((interception) => {
      const cookieHeader = interception.request.headers.cookie;

      if (cookieHeader) {
        const formKeyMatch = cookieHeader.match(/form_key=([^;]+)/);
        if (formKeyMatch) {
            const formKey = formKeyMatch[1];
            cy.log(`Form Key: ${formKey}`);
            Cypress.env('formKey', formKey);
        } else {
            cy.log('Form Key not found in cookies');
        }
      } else {
          cy.log('No cookies in request headers');
      }
      
    })
  })
})

Cypress.Commands.add('getFormKey', () => {
  return cy.wrap(Cypress.env('formKey'));
});


Cypress.Commands.add('addItemToCart', (size, color, quantity) => {
  cy.visit('/bess-yoga-short.html')
  cartPage.sizeOption.contains(size).click()
  cartPage.getColorOption(color).click()
  cartPage.cartItemQuantity.clear().type(quantity)
  cartPage.addToCartButton.click()
  cartPage.counterNumber.should('be.visible')
})