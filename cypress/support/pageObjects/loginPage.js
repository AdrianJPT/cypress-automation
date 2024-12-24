class LoginPage {

  get email() {
    return cy.get('#email')
  }

  get password() {
    return cy.get('#pass')
  }

  get submitButton() {
    return cy.get('#send2')
  }

  get messageError() {
    return cy.get('.message-error > div')
  }
  get emailErrorMessage() {
    return cy.get('#email-error')
  }

  get passwordErrorMessage() {
    return cy.get('#pass-error')
  }

  visit() {
    cy.visit('/customer/account/login')
  }

  fillEmail(value) {
    this.email.type(value)
  }

  fillPassword(value) {
    this.password.type(value)
  }

  clickSubmit() {
    this.submitButton.click()
  }
}

export default LoginPage