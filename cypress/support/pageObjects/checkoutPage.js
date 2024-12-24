class CheckoutPage {
    get firstNameInput() {
      return cy.get('input[name="firstname"]')
    }
  
    get lastNameInput() {
      return cy.get('input[name="lastname"]')
    }
  
    get addressInput() {
      return cy.get('input[name="street[0]"]')
    }
  
    get cityInput() {
      return cy.get('input[name="city"]')
    }
  
    get stateSelect() {
      return cy.get('select[name="region_id"]')
    }
  
    get zipCodeInput() {
      return cy.get('input[name="postcode"]')
    }
  
    get countrySelect() {
      return cy.get('select[name="country_id"]')
    }
  
    get phoneNumberInput() {
      return cy.get('input[name="telephone"]')
    }
  
    get fixShippingMethodRadio() {
      return cy.get('input[name="ko_unique_1"]')
    }

    get TablerateShippingMethodRadio() {
      return cy.get('input[name="ko_unique_1"]')
    }
  
    get nextButton() {
      return cy.get('button.continue')
    }
  
    get placeOrderButton() {
      return cy.get('button[title="Place Order"]')
    }
  
    get orderConfirmationMessage() {
      return cy.get('.checkout-success')
    }
    get pageTittle(){
      return cy.get('span[data-ui-id="page-title-wrapper"]')
    }

    get orderSummary(){
      return cy.get('.opc-block-summary')
    }

    
  }
  
  export default CheckoutPage