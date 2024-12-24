import LoginPage from '../../../support/pageObjects/loginPage'
import ProfilePage from '../../../support/pageObjects/profilePage';
const loginPage = new LoginPage()
const profilePage = new ProfilePage()
let data;

describe('User Login', () => {
  beforeEach(() => {    
    cy.fixture('testData').then((datatest) => {data = datatest})
    cy.visit('/customer/account/login')
  })

  it('should login with valid credentials', function() {
    cy.visit('/customer/account/login')
    loginPage.fillEmail(data.validUser.email)
    loginPage.fillPassword(data.validUser.password)
    loginPage.clickSubmit()
    profilePage.accountInformation.should('contain', data.validUser.email)
  })

  it('should show an error for invalid credentials', function() {
    loginPage.fillEmail(data.invalidUser.email)
    loginPage.fillPassword(data.invalidUser.password)
    loginPage.clickSubmit()
    loginPage.messageError.should('have.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
  })

  it('should show an error for incorrect password', function() {
    loginPage.fillEmail(data.validUser.email)
    loginPage.fillPassword('incorrect-password')
    loginPage.clickSubmit()
    loginPage.messageError.should('have.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
  })

  it('should show an error for unregistered email', function() {
    loginPage.fillEmail('unregistered-email@example.com')
    loginPage.fillPassword(data.validUser.password)
    loginPage.clickSubmit()
    loginPage.messageError.should('have.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
  })

})
