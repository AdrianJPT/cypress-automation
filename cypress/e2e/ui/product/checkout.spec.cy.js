import CartPage from '../../../support/pageObjects/cartPage'
import CheckoutPage from '../../../support/pageObjects/checkoutPage'
const cartPage = new CartPage()
const checkoutPage = new CheckoutPage()
let data;

describe('Checkout Process', () => {
  beforeEach(() => {
    cy.fixture('testData').then((datatest) => {
      data = datatest
    }).then(() => {
      cy.login(data.validUser.email, data.validUser.password)
    })
    cy.log('Adding item to cart')
    cy.addItemToCart('28', 'Blue', '1')
    cy.log('Visiting checkout page')
    cy.visit('/checkout/#shipping')
  })

  it('should complete the checkout process', function() {
    cy.log('Verifying URL contains /checkout/#shipping')
    cy.url().should('include', '/checkout/#shipping')
    cy.log('Selecting fixed shipping method')
    checkoutPage.fixShippingMethodRadio.check({force: true})
    cy.log('Clicking next button')
    checkoutPage.nextButton.click()
    cy.log('Clicking place order button')
    checkoutPage.placeOrderButton.click()
    cy.log('Verifying order confirmation page title')
    checkoutPage.pageTittle.should('contain', 'Thank you for your purchase!')
    cy.log('Verifying order confirmation message is visible')
    checkoutPage.orderConfirmationMessage.should('be.visible')
    cy.log('Verifying order confirmation message contains tracking info')
    checkoutPage.orderConfirmationMessage.should('contain', "We'll email you an order confirmation with details and tracking info.")
  })

  it('should allow selecting different shipping methods', function() {
    cy.log('Verifying URL contains /checkout/#shipping')
    cy.url().should('include', '/checkout/#shipping')
    cy.log('Selecting fixed shipping method')
    checkoutPage.fixShippingMethodRadio.check({force: true})
    cy.log('Clicking next button')
    checkoutPage.nextButton.click()
    cy.log('Selecting table rate shipping method')
    checkoutPage.TablerateShippingMethodRadio.check({force: true})
    cy.log('Clicking place order button')
    checkoutPage.placeOrderButton.click()
    cy.log('Verifying order confirmation page title')
    checkoutPage.pageTittle.should('contain', 'Thank you for your purchase!')
    cy.log('Verifying order confirmation message is visible')
    checkoutPage.orderConfirmationMessage.should('be.visible')
    cy.log('Verifying order confirmation message contains tracking info')
    checkoutPage.orderConfirmationMessage.should('contain', "We'll email you an order confirmation with details and tracking info.")
  })

  it('should display the correct order summary', function() {
    cy.log('Verifying URL contains /checkout/#shipping')
    cy.url().should('include', '/checkout/#shipping')
    cy.log('Selecting fixed shipping method')
    checkoutPage.fixShippingMethodRadio.check({force: true})
    cy.log('Verifying order summary contains correct items and details')
    checkoutPage.orderSummary.should('contain', 'Bess Yoga Short')
    checkoutPage.orderSummary.should('contain', '28')
    checkoutPage.orderSummary.should('contain', 'Blue')
    cy.log('Clicking next button')
    checkoutPage.nextButton.click()
    cy.log('Clicking place order button')
    checkoutPage.placeOrderButton.click()
    cy.log('Verifying order confirmation page title')
    checkoutPage.pageTittle.should('contain', 'Thank you for your purchase!')
    cy.log('Verifying order confirmation message is visible')
    checkoutPage.orderConfirmationMessage.should('be.visible')
    cy.log('Verifying order confirmation message contains tracking info')
    checkoutPage.orderConfirmationMessage.should('contain', "We'll email you an order confirmation with details and tracking info.")
  })
})