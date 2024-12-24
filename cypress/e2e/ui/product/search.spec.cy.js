import SearchPage from '../../../support/pageObjects/searchPage'
const searchPage = new SearchPage()

describe('Product Search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display results for a valid product search', function() {
    searchPage.searchInput.type('shirt')
    searchPage.searchButton.click()
    searchPage.searchResults.should('be.visible')
    searchPage.searchResults.should('contain', 'shirt')
  })

  it('should display no results message for an invalid product search', function() {
    searchPage.searchInput.type('invalidproductname')
    searchPage.searchButton.click()
    searchPage.noResultsMessage.should('be.visible')
    searchPage.noResultsMessage.should('contain', 'Your search returned no results.')
  })

  it('should display results for a partial product search', function() {
    searchPage.searchInput.type('shi')
    searchPage.searchButton.click()
    searchPage.searchResults.should('be.visible')
    searchPage.searchResults.should('contain', 'shirt')
  })

  it('should display results for a product search with special characters', function() {
    searchPage.searchInput.type('shirt!')
    searchPage.searchButton.click()
    searchPage.searchResults.should('be.visible')
    searchPage.searchResults.should('contain', 'shirt')
  })
})