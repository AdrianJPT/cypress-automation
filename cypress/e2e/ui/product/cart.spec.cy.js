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
    cy.addItemToCart('28', 'Blue', '1')
    cartPage.cartIcon.click()

    cartPage.viewCartButton.click()
    cartPage.cartItem.should('be.visible')
    cartPage.cartItem.should('contain', '28')
    cartPage.cartItem.should('contain', 'Blue')
  })

  it('should update the quantity of an item in the cart', function() {
    cy.addItemToCart('28', 'Blue', '10')

    cartPage.cartIcon.click()
    cartPage.viewCartButton.click()

    cartPage.cartItemQuantity.clear().type('2')
    cartPage.updateCartButton.click()
    cartPage.cartItemQuantity.should('have.value', '2')
  })

  it('should remove an item from the cart', function() {
    cy.addItemToCart('28', 'Blue', '1')

    cartPage.cartIcon.click()
    cartPage.viewCartButton.click()
    
    cartPage.removeItemButton.click()
    cartPage.emptyCartMessage.should('be.visible')
    cartPage.emptyCartMessage.should('contain', 'You have no items in your shopping cart.')
  })

  it('should display an empty cart message when the cart is empty', function() {
    cartPage.cartIcon.click()
    cartPage.emptyCartSubtittleMessage.should('contain', 'You have no items in your shopping cart.')
  })
})