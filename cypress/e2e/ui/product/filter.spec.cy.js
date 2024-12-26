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
    cy.log('Clicking size filter')
    filterPage.sizeFilter.click()
    cy.log('Selecting size M')
    filterPage.filterOption.contains('M').click()
    cy.log('Verifying filtered products are visible')
    filterPage.filteredProducts.should('be.visible')
    cy.log('Verifying filtered products contain size M')
    filterPage.filteredProducts.should('contain', 'M')
  })

  it('should filter products by color', function() {
    cy.log('Clicking color filter')
    filterPage.colorFilter.click()
    cy.log('Selecting color Blue')
    filterPage.getColorOption('Blue').click()
    cy.log('Verifying filtered products are visible')
    filterPage.filteredProducts.should('be.visible')
    cy.log('Verifying filtered products contain color Blue')
    filterPage.filteredProducts.find('div[option-label="Blue"]').should('exist')
  })

  it('should filter products by price range', function() {
    cy.log('Clicking price filter')
    filterPage.priceFilter.click()
    cy.log('Selecting price range $50.00 - $59.99')
    cy.get('.filter-options-content').contains('$50.00 - $59.99').click()
    cy.log('Verifying filtered products are visible')
    filterPage.filteredProducts.should('be.visible')
    cy.log('Verifying filtered products are within the price range $50.00 - $59.99')
    filterPage.filteredProducts.each(($el) => {
      const price = parseFloat($el.find('.price').text().replace('$', ''))
      expect(price).to.be.within(50, 59.99)
    })
  })
})