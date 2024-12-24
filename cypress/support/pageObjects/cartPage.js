class CartPage {
    get addToCartButton() {
      return cy.get('button[title="Add to Cart"]')
    }

    get counterNumber() {
        return cy.get('span[class="counter-number"]')
      }

    get cartIcon() {
      return cy.get('.showcart')
    }
  
    get viewCartButton() {
      return cy.get('a[class="action viewcart"]')
    }
  
    get cartItem() {
      return cy.get('.cart.item')
    }
  
    get cartItemQuantity() {
      return cy.get('input[title="Qty')
    }
  
    get updateCartButton() {
      return cy.get('button[title="Update Shopping Cart"]')
    }
  
    get removeItemButton() {
      return cy.get('a[title="Remove item"]')
    }
  
    get emptyCartMessage() {
      return cy.get('.cart-empty')
    }

    get emptyCartSubtittleMessage() {
        return cy.get('strong[class="subtitle empty"]')
      }

    get productItem(){
        return cy.get('.product-item')
    }

    get sizeOption(){
        return cy.get('div[class="swatch-option text"]')
    }

    getColorOption(color){
        return cy.get(`div[option-label="${color}"]`)
    }

    get quantityOption(){
        return cy.get('#qty')
    }

    get successMessage(){
        return cy.get('message-success > div')
    }
    
    get proceedToCheckoutButton(){
        return cy.get('#top-cart-btn-checkout')
    }
    get cartTotalSumnary(){
        return cy.get('#cart-totals')
    }
  }
  
  export default CartPage