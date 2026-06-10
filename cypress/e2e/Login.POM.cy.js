import LoginPage from '../pages/LoginPage'

const loginPage = new LoginPage()

describe('OrangeHRM Login POM', () => {

    beforeEach(() => {

        cy.fixture('LoginData').then((data) => {
             cy.wrap(data).as('loginData')
        })

        loginPage.visit()
    })
 
    // TC01
    it('TC_LOGIN_001 - Login Valid', function () {
        loginPage.login(
             this.loginData.validUser.username,
             this.loginData.validUser.password
        )

        cy.url().should('include', '/dashboard')
    })

    // TC02
    it('TC_LOGIN_002 - Invalid Username', function () {
        loginPage.login(
             this.loginData.invalidUsername.username,
             this.loginData.invalidUsername.password
        )

        cy.contains('Invalid credentials')
             .should('be.visible')
    })

    // TC03
    it('TC_LOGIN_003 - Invalid Password', function () {
        loginPage.login(
             this.loginData.invalidPassword.username,
             this.loginData.invalidPassword.password
        )

        cy.contains('Invalid credentials')
             .should('be.visible')
    })

    // TC04
    it('TC_LOGIN_004 - Empty Username and Password', () => {
        loginPage.loginButton().click()

        cy.contains('Required')
             .should('be.visible')
    })

    // TC05
    it('TC_LOGIN_005 - Empty Username', () => {
        loginPage.passwordField()
            .type('admin123')

        loginPage.loginButton()
            .click()

        cy.contains('Required')
            .should('be.visible')
    })

    // TC06
    it('TC_LOGIN_006 - Empty Password', () => {
        loginPage.usernameField()
            .type('Admin')

        loginPage.loginButton()
            .click()

        cy.contains('Required')
            .should('be.visible')
    })

    // TC07
    it('TC_LOGIN_007 - Forgot Password', () => {
        loginPage.forgotPasswordLink()
            .click()

        cy.url()
            .should('include', 'requestPasswordResetCode')
    })

    // TC08
    it('TC_LOGIN_008 - Password Masking', () => {
        loginPage.passwordField()
            .type('admin123')

        loginPage.passwordField()
            .should('have.attr', 'type', 'password')
    })

    // TC09
    it('TC_LOGIN_009 - Username Field Input', () => {
        loginPage.usernameField()
            .type('Admin')
            .should('have.value', 'Admin')
    })

    // TC10
    it('TC_LOGIN_010 - Password Field Input', () => {
        loginPage.passwordField()
            .type('admin123')
            .should('have.value', 'admin123')
    })

    // TC11
    it('TC_LOGIN_011 - Login With Space Character', function () {
        loginPage.login(
            this.loginData.spaceCharacter.username,
            this.loginData.spaceCharacter.password
        )

    })

    // TC12
    it('TC_LOGIN_012 - Refresh Login Page', () => {
        cy.reload()

        cy.url()
            .should('include', '/auth/login')
    })

    // TC13
    it('TC_LOGIN_013 - Login After Refresh', function () {
        cy.reload()

        loginPage.login(
            this.loginData.validUser.username,
            this.loginData.validUser.password
        )

        cy.url()
            .should('include', '/dashboard')
    })

    // TC14
    it('TC_LOGIN_014 - Error Message Display', function () {
        loginPage.login(
            this.loginData.invalidPassword.username,
            this.loginData.invalidPassword.password
        )

        cy.contains('Invalid credentials')
            .should('be.visible')
    })

    // TC15
    it('TC_LOGIN_015 - Stay On Login Page After Failed Login', function () {
        loginPage.login(
            this.loginData.invalidPassword.username,
            this.loginData.invalidPassword.password
        )

        cy.url()
            .should('include', '/auth/login')
    })

    //TC16
    it('TC_LOGIN_016 - Login Using Enter Key', () => {
        loginPage.usernameField()
            .type('Admin')

        loginPage.passwordField()
            .type('admin123{enter}')

        cy.url()
            .should('include', '/dashboard')
    })

    //TC17
    it('TC_LOGIN_017 - Session Persistence', function () {
        loginPage.login(
            this.loginData.validUser.username,
            this.loginData.validUser.password
        )

        cy.reload()

        cy.url()
            .should('include', '/dashboard')
    })

    //TC18
    it('TC_LOGIN_018 - Login Button Visible', () => {
        loginPage.loginButton()
            .should('be.visible')
    })

    //TC19
    it('TC_LOGIN_019 - Username Placeholder', () => {
        loginPage.usernameField()
            .should('have.attr', 'placeholder')
    })

    //TC20
    it('TC_LOGIN_020 - Password Placeholder', () => {
        loginPage.passwordField()
            .should('have.attr', 'placeholder')
    })

})