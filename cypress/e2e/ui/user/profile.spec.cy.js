import ProfilePage from '../../../support/pageObjects/profilePage'
const profilePage = new ProfilePage()
let data;

describe('User Profile', () => {
  beforeEach(() => {
      cy.fixture('testData').then((datatest) => {
        data = datatest
      }).then(() => {
        cy.login(data.validUser.email, data.validUser.password)
        cy.visit('/customer/account')
      })
    })

  it('should display the correct user information', function() {
    profilePage.accountInformation.should('contain', data.validUser.email)
  })

  it('should allow the user to edit their profile', function() {
    profilePage.editProfileButton.click()
    profilePage.firstNameInput.clear().type('NewFirstName')
    profilePage.lastNameInput.clear().type('NewLastName')
    profilePage.saveButton.click()
    profilePage.successMessage.should('be.visible')
    profilePage.successMessage.should('contain', 'You saved the account information.')
    profilePage.accountInformation.should('contain', 'NewFirstName NewLastName')
  })

  it('should show an error when required fields are empty', function() {
    profilePage.editProfileButton.click()
    profilePage.firstNameInput.clear()
    profilePage.lastNameInput.clear()
    profilePage.saveButton.click()
    profilePage.firstNameInput.should('have.class', 'mage-error')
    profilePage.lastNameInput.should('have.class', 'mage-error')
  })
})