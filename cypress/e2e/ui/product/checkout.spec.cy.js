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
    cy.addItemToCart('28', 'Blue', '1')
    cy.visit('/checkout/#shipping')
  })

  it('should complete the checkout process', function() {
    cy.url().should('include', '/checkout/#shipping') 
    checkoutPage.fixShippingMethodRadio.check({force: true})
    checkoutPage.nextButton.click()
    checkoutPage.placeOrderButton.click()
    checkoutPage.pageTittle.should('contain', 'Thank you for your purchase!')
    checkoutPage.orderConfirmationMessage.should('be.visible')
    checkoutPage.orderConfirmationMessage.should('contain', "We'll email you an order confirmation with details and tracking info.")
  })

  it('should allow selecting different shipping methods', function() {
    cy.url().should('include', '/checkout/#shipping')
    checkoutPage.fixShippingMethodRadio.check({force: true})
    checkoutPage.nextButton.click()
    checkoutPage.TablerateShippingMethodRadio.check({force: true})
    checkoutPage.placeOrderButton.click()
    checkoutPage.pageTittle.should('contain', 'Thank you for your purchase!')
    checkoutPage.orderConfirmationMessage.should('be.visible')
    checkoutPage.orderConfirmationMessage.should('contain', "We'll email you an order confirmation with details and tracking info.")
  })

  it('should display the correct order summary', function() {
    cy.url().should('include', '/checkout/#shipping')
    checkoutPage.fixShippingMethodRadio.check({force: true})
    checkoutPage.orderSummary.should('contain', 'Bess Yoga Short')
    checkoutPage.orderSummary.should('contain', '28')
    checkoutPage.orderSummary.should('contain', 'Blue')
    checkoutPage.nextButton.click()
    checkoutPage.placeOrderButton.click()
    checkoutPage.pageTittle.should('contain', 'Thank you for your purchase!')
    checkoutPage.orderConfirmationMessage.should('be.visible')
    checkoutPage.orderConfirmationMessage.should('contain', "We'll email you an order confirmation with details and tracking info.")
  })
})