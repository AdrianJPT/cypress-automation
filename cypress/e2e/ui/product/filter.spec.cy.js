import FilterPage from '../../../support/pageObjects/filterPage'
const filterPage = new FilterPage()
let data;

describe('Product Filtering', () => {
  beforeEach(() => {
    cy.fixture('testData').then((datatest) => {
      data = datatest
    })
    cy.visit('/men/tops-men/jackets-men.html')
  })

  it('should filter products by size', function() {
    filterPage.sizeFilter.click()
    filterPage.filterOption.contains('M').click()
    filterPage.filteredProducts.should('be.visible')
    filterPage.filteredProducts.should('contain', 'M')
  })

  it('should filter products by color', function() {
    filterPage.colorFilter.click()
    filterPage.getColorOption('Blue').click()
    filterPage.filteredProducts.should('be.visible')
    filterPage.filteredProducts.find('div[option-label="Blue"]').should('exist')
  })

  it('should filter products by price range', function() {
    filterPage.priceFilter.click()
    cy.get('.filter-options-content').contains('$50.00 - $59.99').click()
    filterPage.filteredProducts.should('be.visible')
    filterPage.filteredProducts.each(($el) => {
      const price = parseFloat($el.find('.price').text().replace('$', ''))
      expect(price).to.be.within(50, 59.99)
    })
  })
})