class RegistrationPage {

    get firstName() {
      return cy.get('#firstname')
    }
  
    get lastName() {
      return cy.get('#lastname')
    }
  
    get email() {
      return cy.get('#email_address')
    }
  
    get password() {
      return cy.get('#password')
    }
  
    get passwordConfirmation() {
      return cy.get('#password-confirmation')
    }
  
    get submitButton() {
      return cy.get('button[title="Create an Account"]')
    }

    get messageError() {
        return cy.get('.message-error > div')
      }
  
    get firstNameErrorMessage() {
      return cy.get('#firstname-error')
    }
  
    get lastNameErrorMessage() {
      return cy.get('#lastname-error')
    }
  
    get emailErrorMessage() {
      return cy.get('#email_address-error')
    }
  
    get passwordErrorMessage() {
      return cy.get('#password-error')
    }
  
    get passwordConfirmationErrorMessage() {
      return cy.get('#password-confirmation-error')
    }
  }
  
  export default RegistrationPage