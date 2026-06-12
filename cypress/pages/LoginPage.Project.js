class LoginPage {

    visitLoginPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        cy.url({ timeout: 20000 })
          .should('include', '/auth/login')
    }

    inputUsername(username) {
        cy.get('input[name="username"]', { timeout: 15000 })
          .should('be.visible')
          .should('not.be.disabled')
          .clear()
          .type(username)
    }

    inputPassword(password) {
        cy.get('input[name="password"]', { timeout: 15000 })
          .should('be.visible')
          .should('not.be.disabled')
          .clear()
          .type(password)
    }

    clickLogin() {
        cy.get('button[type="submit"]', { timeout: 10000 })
          .should('be.visible')
          .should('not.be.disabled')
          .click()
    }

    verifyDashboard() {
        cy.url({ timeout: 15000 })
          .should('include', '/dashboard')
    }

    verifyInvalidCredential() {
        cy.contains('Invalid credentials', { timeout: 10000 })
          .should('be.visible')
    }

    verifyRequiredMessage() {
        cy.contains('Required', { timeout: 10000 })
          .should('be.visible')
    }

    clickProfile() {
        cy.get('.oxd-userdropdown-tab', { timeout: 15000 })
          .should('be.visible')
          .click()
    }

    clickLogout() {
        cy.contains('Logout', { timeout: 10000 })
          .should('be.visible')
          .click()
    }

    verifyBackToLogin() {
        cy.url({ timeout: 15000 })
          .should('include', '/auth/login')
    }
}

export default new LoginPage()