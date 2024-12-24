class ProfilePage {
    get accountInformation() {
      return cy.get('.box-content > p')
    }
  
    get editProfileButton() {
      return cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span')
    }
  
    get firstNameInput() {
      return cy.get('#firstname')
    }
  
    get lastNameInput() {
      return cy.get('#lastname')
    }
  
    get saveButton() {
      return cy.get('button[title="Save"]')
    }
  
    get successMessage() {
      return cy.get('.message-success')
    }
  }
  
  export default ProfilePage