import { generateUniqueEmail } from '../../../support/utils';

import RegistrationPage from '../../../support/pageObjects/registrationPage'
import ProfilePage from '../../../support/pageObjects/profilePage';
const registrationPage = new RegistrationPage()
const profilePage = new ProfilePage()

let data;
let uniqueEmail;

describe('User Registration', () => {
  beforeEach(() => {
    cy.fixture('testData').then((datatest) => { data = datatest })
    uniqueEmail = generateUniqueEmail('validUser');
    cy.visit('/customer/account/create')
  })

  it('should register with valid data', function() {
    registrationPage.firstName.type(data.validUser.firstName)
    registrationPage.lastName.type(data.validUser.lastName)
    registrationPage.email.type(uniqueEmail)
    registrationPage.password.type(data.validUser.password)
    registrationPage.passwordConfirmation.type(data.validUser.password)
    registrationPage.submitButton.click()
    cy.url().should('include', '/customer/account')
    profilePage.accountInformation.should('contain', data.validUser.firstName + ' ' + data.validUser.lastName)
    profilePage.accountInformation.should('contain', uniqueEmail)
  })

  it('should show errors for empty fields', function() {
    registrationPage.submitButton.click()
    registrationPage.firstNameErrorMessage.should('contain', 'This is a required field.')
    registrationPage.lastNameErrorMessage.should('contain', 'This is a required field.')
    registrationPage.emailErrorMessage.should('contain', 'This is a required field.')
    registrationPage.passwordErrorMessage.should('contain', 'This is a required field.')
    registrationPage.passwordConfirmationErrorMessage.should('contain', 'This is a required field.')
  })

  it('should show an error for invalid email format', function() {
    registrationPage.firstName.type(data.validUser.firstName)
    registrationPage.lastName.type(data.validUser.lastName)
    registrationPage.email.type('invalid-email')
    registrationPage.password.type(data.validUser.password)
    registrationPage.passwordConfirmation.type(data.validUser.password)
    registrationPage.submitButton.click()
    registrationPage.emailErrorMessage.should('contain', 'Please enter a valid email address')
  })

  it('should show an error for passwords not matching', function() {
    registrationPage.firstName.type(data.validUser.firstName)
    registrationPage.lastName.type(data.validUser.lastName)
    registrationPage.email.type(uniqueEmail)
    registrationPage.password.type(data.validUser.password)
    registrationPage.passwordConfirmation.type('different-password')
    registrationPage.submitButton.click()
    registrationPage.passwordConfirmationErrorMessage.should('contain', 'Please enter the same value again.')
  })

  it('should show an error for short password', function() {
    registrationPage.firstName.type(data.validUser.firstName)
    registrationPage.lastName.type(data.validUser.lastName)
    registrationPage.email.type(uniqueEmail)
    registrationPage.password.type('short')
    registrationPage.passwordConfirmation.type('short')
    registrationPage.submitButton.click()
    registrationPage.passwordErrorMessage.should('contain', 'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
  })

  it('should show an error for existing email', function() {
    registrationPage.firstName.type(data.validUser.firstName)
    registrationPage.lastName.type(data.validUser.lastName)
    registrationPage.email.type(data.existingUser.email)
    registrationPage.password.type(data.validUser.password)
    registrationPage.passwordConfirmation.type(data.validUser.password)
    registrationPage.submitButton.click()
    registrationPage.messageError.should('contain', 'There is already an account with this email address.')
  })

  it('should show an error for special characters in name', function() {
    registrationPage.firstName.type('John@')
    registrationPage.lastName.type('Doe#')
    registrationPage.email.type(uniqueEmail)
    registrationPage.password.type(data.validUser.password)
    registrationPage.passwordConfirmation.type(data.validUser.password)
    registrationPage.submitButton.click()
    registrationPage.messageError.should('contain', 'First Name is not valid!')
    registrationPage.messageError.should('contain', 'Last Name is not valid!')
  })
})