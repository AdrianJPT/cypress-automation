import CartPage from '../../../support/pageObjects/cartPage'
import SearchPage from '../../../support/pageObjects/searchPage';
const cartPage = new CartPage()
const searchPage = new SearchPage()
let data;

describe('Shopping Cart Management', () => {
  beforeEach(() => {
    cy.fixture('testData').then((datatest) => {
      data = datatest
    }).then(() => {
      cy.login(data.validUser.email, data.validUser.password)
    })
    cy.visit('/bess-yoga-short.html')
  })

  it('should add an item to the cart', function() {
    cy.log('Adding item to cart')
    cy.addItemToCart('28', 'Blue', '1')
    cy.log('Opening cart')
    cartPage.cartIcon.click()
    cy.log('Viewing cart')
    cartPage.viewCartButton.click()
    cy.log('Verifying item is visible in the cart')
    cartPage.cartItem.should('be.visible')
    cy.log('Verifying item contains size 28')
    cartPage.cartItem.should('contain', '28')
    cy.log('Verifying item contains color Blue')
    cartPage.cartItem.should('contain', 'Blue')
  })

  it('should update the quantity of an item in the cart', function() {
    cy.log('Adding item to cart')
    cy.addItemToCart('28', 'Blue', '10')
    cy.log('Opening cart')
    cartPage.cartIcon.click()
    cy.log('Viewing cart')
    cartPage.viewCartButton.click()
    cy.log('Updating item quantity to 2')
    cartPage.cartItemQuantity.clear().type('2')
    cy.log('Clicking update cart button')
    cartPage.updateCartButton.click()
    cy.log('Verifying item quantity is updated to 2')
    cartPage.cartItemQuantity.should('have.value', '2')
  })

  it('should remove an item from the cart', function() {
    cy.log('Adding item to cart')
    cy.addItemToCart('28', 'Blue', '1')
    cy.log('Opening cart')
    cartPage.cartIcon.click()
    cy.log('Viewing cart')
    cartPage.viewCartButton.click()
    cy.log('Removing item from cart')
    cartPage.removeItemButton.click()
    cy.log('Verifying cart is empty')
    cartPage.emptyCartMessage.should('be.visible')
    cy.log('Verifying empty cart message contains: You have no items in your shopping cart.')
    cartPage.emptyCartMessage.should('contain', 'You have no items in your shopping cart.')
  })

  it('should display an empty cart message when the cart is empty', function() {
    cy.log('Opening cart')
    cartPage.cartIcon.click()
    cy.log('Verifying empty cart message is visible')
    cartPage.emptyCartSubtittleMessage.should('contain', 'You have no items in your shopping cart.')
  })
})