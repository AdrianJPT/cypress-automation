class SearchPage {

    get searchInput() {
      return cy.get('#search')
    }
  
    get searchButton() {
      return cy.get('button[type="submit"][title="Search"]')
    }
  
    get searchResults() {
      return cy.get('.search.results')
    }
  
    get noResultsMessage() {
      return cy.get('.message.notice')
    }

    get addToCartButton() {
        return cy.get('button[title="Add to Cart"]')
    }
    
    
  }
  
  export default SearchPage