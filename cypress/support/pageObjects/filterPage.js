class FilterPage {
    get sizeFilter() {
      return cy.get('.filter-options-item').contains('Size')
    }
  
    get colorFilter() {
      return cy.get('.filter-options-item').contains('Color')
    }
  
    getColorOption(color){
        return cy.get('.filter-options-content').find(`div[option-label="${color}"]`)
    }


    get priceFilter() {
      return cy.get('.filter-options-item').contains('Price')
    }
  
    get filteredProducts() {
      return cy.get('.products-grid')
    }
    get filterOption(){
      return cy.get('.filter-options-content').find('a')
    }
  }
  
  export default FilterPage