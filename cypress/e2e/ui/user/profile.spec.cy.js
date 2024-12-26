import RegistrationPage from '../../../support/pageObjects/registrationPage'
import ProfilePage from '../../../support/pageObjects/profilePage'
const registrationPage = new RegistrationPage()
const profilePage = new ProfilePage()
let data;
let uniqueEmail;

function generateUniqueEmail(prefix) {
  const timestamp = new Date().getTime();
  return `${prefix}-${timestamp}@example.com`;
}

describe('User Registration', () => {
  before(() => {
    cy.fixture('testData').then((datatest) => { data = datatest })
  })

  beforeEach(() => {
    uniqueEmail = generateUniqueEmail('validUser');
    cy.visit('/customer/account/create')
  })

  it('should register with valid data', function() {
    cy.log('Filling first name')
    registrationPage.firstName.type(data.validUser.firstName)
    cy.log('Filling last name')
    registrationPage.lastName.type(data.validUser.lastName)
    cy.log('Filling email')
    registrationPage.email.type(uniqueEmail)
    cy.log('Filling password')
    registrationPage.password.type(data.validUser.password)
    cy.log('Filling password confirmation')
    registrationPage.passwordConfirmation.type(data.validUser.password)
    cy.log('Submitting registration form')
    registrationPage.submitButton.click()
    cy.log('Verifying URL contains /customer/account')
    cy.url().should('include', '/customer/account')
    cy.log('Verifying account information contains first name and last name')
    profilePage.accountInformation.should('contain', data.validUser.firstName + ' ' + data.validUser.lastName)
    cy.log('Verifying account information contains email')
    profilePage.accountInformation.should('contain', uniqueEmail)
  })

  it('should show errors for empty fields', function() {
    cy.log('Submitting registration form with empty fields')
    registrationPage.submitButton.click()
    cy.log('Verifying first name error message')
    registrationPage.firstNameErrorMessage.should('contain', 'This is a required field.')
    cy.log('Verifying last name error message')
    registrationPage.lastNameErrorMessage.should('contain', 'This is a required field.')
    cy.log('Verifying email error message')
    registrationPage.emailErrorMessage.should('contain', 'This is a required field.')
    cy.log('Verifying password error message')
    registrationPage.passwordErrorMessage.should('contain', 'This is a required field.')
    cy.log('Verifying password confirmation error message')
    registrationPage.passwordConfirmationErrorMessage.should('contain', 'This is a required field.')
  })

  it('should show an error for invalid email', function() {
    cy.log('Filling first name')
    registrationPage.firstName.type(data.validUser.firstName)
    cy.log('Filling last name')
    registrationPage.lastName.type(data.validUser.lastName)
    cy.log('Filling invalid email')
    registrationPage.email.type('invalid-email')
    cy.log('Filling password')
    registrationPage.password.type(data.validUser.password)
    cy.log('Filling password confirmation')
    registrationPage.passwordConfirmation.type(data.validUser.password)
    cy.log('Submitting registration form')
    registrationPage.submitButton.click()
    cy.log('Verifying email error message')
    registrationPage.emailErrorMessage.should('contain', 'Please enter a valid email address (Ex: johndoe@domain.com).')
  })
})