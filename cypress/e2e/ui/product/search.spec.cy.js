import SearchPage from '../../../support/pageObjects/searchPage'
const searchPage = new SearchPage()

describe('Product Search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display results for a valid product search', function() {
    cy.log('Typing search query: shirt')
    searchPage.searchInput.type('shirt')
    cy.log('Clicking search button')
    searchPage.searchButton.click()
    cy.log('Verifying search results are visible')
    searchPage.searchResults.should('be.visible')
    cy.log('Verifying search results contain: shirt')
    searchPage.searchResults.should('contain', 'shirt')
  })

  it('should display no results message for an invalid product search', function() {
    cy.log('Typing invalid search query: invalidproductname')
    searchPage.searchInput.type('invalidproductname')
    cy.log('Clicking search button')
    searchPage.searchButton.click()
    cy.log('Verifying no results message is visible')
    searchPage.noResultsMessage.should('be.visible')
    cy.log('Verifying no results message contains: Your search returned no results.')
    searchPage.noResultsMessage.should('contain', 'Your search returned no results.')
  })

  it('should display results for a partial product search', function() {
    cy.log('Typing partial search query: shi')
    searchPage.searchInput.type('shi')
    cy.log('Clicking search button')
    searchPage.searchButton.click()
    cy.log('Verifying search results are visible')
    searchPage.searchResults.should('be.visible')
    cy.log('Verifying search results contain: shirt')
    searchPage.searchResults.should('contain', 'shirt')
  })

  it('should display results for a product search with special characters', function() {
    cy.log('Typing search query with special characters: shirt!')
    searchPage.searchInput.type('shirt!')
    cy.log('Clicking search button')
    searchPage.searchButton.click()
    cy.log('Verifying search results are visible')
    searchPage.searchResults.should('be.visible')
    cy.log('Verifying search results contain: shirt')
    searchPage.searchResults.should('contain', 'shirt')
  })
})