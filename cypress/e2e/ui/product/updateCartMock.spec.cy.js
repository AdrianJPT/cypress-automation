import CartPage from '../../../support/pageObjects/cartPage'
const cartPage = new CartPage()
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

  it('should update the quantity of an item in the cart with invalid data @smoke', function() {
    cy.log('Adding item to cart')
    cy.addItemToCart('28', 'Blue', '1')
    cy.log('Opening cart')
    cartPage.cartIcon.click()
    cartPage.viewCartButton.click()
    cy.log('Updating item quantity')
    cartPage.cartItemQuantity.clear().type('2')
    
    let mockData;
    cy.fixture('apiMocks/productUpdateMock.json').then((productUpdateMock) => {
      mockData = productUpdateMock
    })

    cy.wrap(Cypress.env('formKey')).then((formKey) => {
      cy.intercept(
          {
              method: 'POST',
              url: 'https://magento.softwaretestingboard.com/checkout/cart/updateItemQty/',
          },
          (req) => {
              const bodyParams = new URLSearchParams(mockData);
              bodyParams.set('form_key', formKey);
              bodyParams.set('cart[482339][qty]', '99a');
              req.body = bodyParams.toString();
          }
      ).as('updateItemQty');
    });

    cy.log('Clicking update cart button')
    cartPage.updateCartButton.click();

    cy.wait('@updateItemQty').then((interception) => {
      cy.log('Request intercepted and response received')
    });
    cartPage.popupMessage.should('contain', 'Something went wrong while saving the page. Please refresh the page and try again');
  })
})