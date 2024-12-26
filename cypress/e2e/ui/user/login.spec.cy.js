import LoginPage from '../../../support/pageObjects/loginPage'
import ProfilePage from '../../../support/pageObjects/profilePage';
const loginPage = new LoginPage()
const profilePage = new ProfilePage()
let data;

describe('User Login', () => {
  beforeEach(() => {    
    cy.fixture('testData').then((datatest) => {
      data = datatest
    })
    cy.visit('/customer/account/login')
  })

  it('should login with valid credentials @smoke', function() {
    cy.log('Visiting login page')
    cy.visit('/customer/account/login')
    cy.log('Filling email')
    loginPage.fillEmail(data.validUser.email)
    cy.log('Filling password')
    loginPage.fillPassword(data.validUser.password)
    cy.log('Submitting login form')
    loginPage.clickSubmit()
    cy.log('Verifying account information')
    profilePage.accountInformation.should('contain', data.validUser.email)
  })

  it('should show an error for invalid credentials @smoke', function() {
    cy.log('Filling email with invalid credentials')
    loginPage.fillEmail(data.invalidUser.email)
    cy.log('Filling password with invalid credentials')
    loginPage.fillPassword(data.invalidUser.password)
    cy.log('Submitting login form')
    loginPage.clickSubmit()
    cy.log('Verifying error message')
    loginPage.messageError.should('have.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
  })

  it('should show an error for incorrect password @smoke', function() {
    cy.log('Filling email with valid email')
    loginPage.fillEmail(data.validUser.email)
    cy.log('Filling password with incorrect password')
    loginPage.fillPassword('incorrect-password')
    cy.log('Submitting login form')
    loginPage.clickSubmit()
    cy.log('Verifying error message')
    loginPage.messageError.should('have.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
  })

  it('should show an error for unregistered email @smoke', function() {
    cy.log('Filling email with unregistered email')
    loginPage.fillEmail('unregistered-email@example.com')
    cy.log('Filling password with valid password')
    loginPage.fillPassword(data.validUser.password)
    cy.log('Submitting login form')
    loginPage.clickSubmit()
    cy.log('Verifying error message')
    loginPage.messageError.should('have.text', 'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
  })
})