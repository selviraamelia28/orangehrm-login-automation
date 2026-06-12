class RecruitmentPage {

    clickRecruitmentMenu() {
        cy.contains('Recruitment', { timeout: 10000 })
          .should('be.visible')
          .click()
    }

    inputCandidateName(name) {
        cy.get('input[placeholder="Type for hints..."]').first()
            .clear()
            .type(name)
    }

    searchCandidate(name) {
        cy.get('input[placeholder="Type for hints..."]')
          .first()
          .should('be.visible')
          .clear()
          .type(name)
    }

    selectVacancy(vacancy) {
        cy.get('.oxd-select-text').eq(0).click()
        cy.contains(vacancy).click()
    }

    selectHiringManager(manager) {
        cy.contains('label', 'Hiring Manager')
          .parents('.oxd-input-group')
          .find('input')
          .clear()
          .type(manager)
    }

    selectStatus(status) {
        cy.get('.oxd-select-text').eq(1).click()
        cy.contains(status).click()
    }

    clickSearch() {
        cy.contains('Search').click()
    }

    clickReset() {
        cy.contains('Reset')
    }

    clickAdd() {
        cy.contains('Add').click()
    }

    inputFirstName(firstName) {
        cy.get('input[name="firstName"]').type(firstName)
    }

    inputLastName(lastName) {
        cy.get('input[name="lastName"]').type(lastName)
    }

    inputEmail(email) {
        cy.get('.oxd-input').eq(4).type(email)
    }

    inputContact(contact) {
        cy.get('.oxd-input').eq(5).type(contact)
    }

    clickSave() {
        cy.contains('Save').click()
    }

    verifyCandidateFound() {
        cy.get('.oxd-table-card', { timeout: 10000 })
          .should('have.length.at.least', 1)
    }

    verifyNoRecordFound() {
        cy.get('.oxd-table-body')
          .find('.oxd-table-card')
          .should('have.length', 0)
    }

    verifyRecruitmentPage() {
        cy.url().should('include', '/recruitment/viewCandidates')
    }

    verifyFieldReset() {
        cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
          .first()
          .should(($input) => {
              expect($input.val()).to.eq('')
          })
    }

    verifyCandidateSaved() {
        cy.contains('Application Stage').should('be.visible')
    }

    verifyDataDisplayed() {
        cy.get('.oxd-table-body').should('exist')
    }
}

export default new RecruitmentPage()