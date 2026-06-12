class DirectoryPage {

    visitDirectory() {
        cy.visit('/web/index.php/directory/viewDirectory')
    }

    clickDirectoryMenu() {
        cy.contains('span', 'Directory', { timeout: 10000 })
          .should('be.visible')
          .click()
    }

    inputEmployeeName(name) {
        cy.get('input[placeholder="Type for hints..."]')
            .clear()
            .type(name)
    }

    selectJobTitle(title) {
        cy.get('.oxd-select-text').eq(0).click()
        cy.contains(title).click()
    }

    selectLocation(location) {
        cy.get('.oxd-select-text').eq(1).click()
        cy.contains(location).click()
    }

    clickSearch() {
        cy.contains('Search').click()
    }

    clickReset() {
        cy.contains('Reset').click()
    }

    verifyEmployeeFound() {
        cy.get('.oxd-grid-item')
          .should('exist')
          .and('be.visible')
    }

    verifyNoRecordFound() {
        cy.get('.oxd-directory-card').should('not.exist')
    }

    verifyDirectoryPage() {
        cy.url().should('include', '/directory/viewDirectory')
    }

    verifyInputEmpty() {
        cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
            .clear()
            .should('have.value', '')
    }

    verifyDataDisplayed() {
        cy.get('.oxd-grid-item').should('exist')
    }
}

export default new DirectoryPage()