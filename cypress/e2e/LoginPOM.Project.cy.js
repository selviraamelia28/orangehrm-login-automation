import LoginPage from '../pages/LoginPage.Project'

describe('LOGIN FEATURE', () => {

    let loginData

    before(() => {
        cy.fixture('LoginData.Project').then((data) => {
            loginData = data
        })
    })

    beforeEach(() => {
        LoginPage.visitLoginPage()

        cy.url({ timeout: 20000 })
          .should('include', '/auth/login')

        cy.get('input', { timeout: 20000 })
          .should('have.length.at.least', 2)

        cy.get('button[type="submit"]')
          .should('be.visible')
    })

    // TC_LOGIN_001
    it('TC_LOGIN_001 - Login dengan credential valid', () => {

        cy.intercept('POST', '**/auth/validate').as('loginSuccess')

        LoginPage.inputUsername(loginData.validLogin.username)
        LoginPage.inputPassword(loginData.validLogin.password)
        LoginPage.clickLogin()

        cy.wait('@loginSuccess', { timeout: 15000 })

        cy.url({ timeout: 15000 })
          .should('include', '/dashboard')
    })

    // TC_LOGIN_002
    it('TC_LOGIN_002 - Login dengan username salah', () => {

        cy.intercept('POST', '**/auth/validate').as('invalidUsername')

        LoginPage.inputUsername(loginData.invalidUsername.username)
        LoginPage.inputPassword(loginData.invalidUsername.password)
        LoginPage.clickLogin()

        cy.wait('@invalidUsername')

        LoginPage.verifyInvalidCredential()
    })

    // TC_LOGIN_003
    it('TC_LOGIN_003 - Login dengan password salah', () => {

        cy.intercept('POST', '**/auth/validate').as('invalidPassword')

        LoginPage.inputUsername(loginData.invalidPassword.username)
        LoginPage.inputPassword(loginData.invalidPassword.password)
        LoginPage.clickLogin()

        cy.wait('@invalidPassword')

        LoginPage.verifyInvalidCredential()
    })

    // TC_LOGIN_004
    it('TC_LOGIN_004 - Login tanpa Username', () => {

        LoginPage.inputPassword(loginData.onlyPassword.password)
        LoginPage.clickLogin()

        cy.contains('Required', { timeout: 10000 })
          .should('be.visible')
    })

    // TC_LOGIN_005
    it('TC_LOGIN_005 - Login tanpa Password', () => {

        LoginPage.inputUsername(loginData.onlyUsername.username)
        LoginPage.clickLogin()

        cy.contains('Required', { timeout: 10000 })
          .should('be.visible')
    })

    // TC_LOGIN_006
    it('TC_LOGIN_006 - Login tanpa username dan password', () => {

        LoginPage.clickLogin()

        cy.get('.oxd-input-field-error-message', { timeout: 10000 })
          .should('have.length', 2)
    })

    // TC_LOGIN_007
    it('TC_LOGIN_007 - Logout setelah login', () => {

        cy.intercept('POST', '**/auth/validate').as('loginSuccess')

        LoginPage.inputUsername(loginData.validLogin.username)
        LoginPage.inputPassword(loginData.validLogin.password)
        LoginPage.clickLogin()

        cy.wait('@loginSuccess')

        cy.url({ timeout: 15000 })
          .should('include', '/dashboard')

        cy.get('.oxd-userdropdown-tab', { timeout: 15000 })
          .should('be.visible')
          .click()

        cy.contains('Logout')
          .should('be.visible')
          .click()

        cy.url({ timeout: 15000 })
          .should('include', '/auth/login')
    })

    // TC_LOGIN_008
    it('TC_LOGIN_008 - Akses URL Dashboard tanpa login', () => {

        cy.clearCookies()
        cy.clearLocalStorage()

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

        cy.url({ timeout: 15000 })
          .should('include', '/auth/login')
    })
})