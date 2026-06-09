describe('OrangeHRM Login Intercept Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // TC_LOGIN_001
  it('TC_LOGIN_001 - Login Valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValid')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginValid')
    cy.url().should('include', '/dashboard')
  })


  // TC_LOGIN_002
  it('TC_LOGIN_002 - Invalid Username', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidUsername')

    cy.get('input[name="username"]').type('admin1')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidUsername')
    cy.contains('Invalid').should('be.visible')
  })


  // TC_LOGIN_003
  it('TC_LOGIN_003 - Invalid Password', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidPassword')
    cy.contains('Invalid').should('be.visible')
  })


  // TC_LOGIN_004
  it('TC_LOGIN_004 - Empty Username and Password', () => {
    cy.intercept('POST', '**/auth/validate').as('emptyCredential')

    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })


  // TC_LOGIN_005
  it('TC_LOGIN_005 - Empty Username', () => {
    cy.intercept('POST', '**/auth/validate').as('emptyUsername')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })


  // TC_LOGIN_006
  it('TC_LOGIN_006 - Empty Password', () => {
    cy.intercept('POST', '**/auth/validate').as('emptyPassword')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })


  // TC_LOGIN_007
  it('TC_LOGIN_007 - Login Function Verification', () => {
    cy.intercept('POST', '**/auth/validate').as('loginVerification')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginVerification')
    cy.url().should('include', '/dashboard')
  })


  // TC_LOGIN_008
  it('TC_LOGIN_008 - Forgot Password', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('forgotPassword')

    cy.contains('Forgot your password?').click()

    cy.wait('@forgotPassword')
    cy.url().should('include', 'requestPasswordResetCode')
  })


  // TC_LOGIN_010
  it('TC_LOGIN_010 - Login With Space Character', () => {
    cy.intercept('POST', '**/auth/validate').as('spaceLogin')

    cy.get('input[name="username"]').type(' ')
    cy.get('input[name="password"]').type(' ')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })


  // TC_LOGIN_012
  it('TC_LOGIN_012 - Refresh After Failed Login', () => {
    cy.intercept('POST', '**/auth/validate').as('refreshFailed')

    cy.get('input[name="username"]').type('salah')
    cy.get('input[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.wait('@refreshFailed')

    cy.reload()
    cy.url().should('include', '/auth/login')
  })


  // TC_LOGIN_013
  it('TC_LOGIN_013 - Login After Refresh', () => {
    cy.intercept('POST', '**/auth/validate').as('loginAfterRefresh')

    cy.reload()

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginAfterRefresh')

    cy.url().should('include', '/dashboard')
  })


  // TC_LOGIN_014
  it('TC_LOGIN_014 - Error Message Display', () => {
    cy.intercept('POST', '**/auth/validate').as('errorMessage')

    cy.get('input[name="username"]').type('salah')
    cy.get('input[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.wait('@errorMessage')

    cy.contains('Invalid credentials').should('be.visible')
  })


  // TC_LOGIN_017
  it('TC_LOGIN_017 - Stay On Login Page After Failed Login', () => {
    cy.intercept('POST', '**/auth/validate').as('stayLoginPage')

    cy.get('input[name="username"]').type('test')
    cy.get('input[name="password"]').type('test123')
    cy.get('button[type="submit"]').click()

    cy.wait('@stayLoginPage')

    cy.url().should('include', '/auth/login')
  })


  // TC_LOGIN_018
  it('TC_LOGIN_018 - Session Persistence', () => {
    cy.intercept('POST', '**/auth/validate').as('sessionPersistence')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@sessionPersistence')

    cy.reload()

    cy.url().should('include', '/dashboard')
  })


  // TC_LOGIN_019
  it('TC_LOGIN_019 - Login Using Enter Key', () => {
    cy.intercept('POST', '**/auth/validate').as('enterKeyLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.wait('@enterKeyLogin')

    cy.url().should('include', '/dashboard')
  })

})