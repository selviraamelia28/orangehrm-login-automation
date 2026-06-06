describe('OrangeHRM Login Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  // TC_LOGIN_001
  it('TC_LOGIN_001 - Login Valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  // TC_LOGIN_002
  it('TC_LOGIN_002 - Invalid Username', () => {
    cy.get('input[name="username"]').type('admin1')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid').should('be.visible')
  })

  // TC_LOGIN_003
  it('TC_LOGIN_003 - Invalid Password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid').should('be.visible')
  })

  // TC_LOGIN_004
  it('TC_LOGIN_004 - Empty Username and Password', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // TC_LOGIN_005
  it('TC_LOGIN_005 - Empty Username', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // TC_LOGIN_006
  it('TC_LOGIN_006 - Empty Password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // TC_LOGIN_007
  it('TC_LOGIN_007 - Login Function Verification', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  // TC_LOGIN_008
  it('TC_LOGIN_008 - Forgot Password', () => {
    cy.contains('Forgot your password?').click()

    cy.url().should('include', 'requestPasswordResetCode')
  })

  // TC_LOGIN_009
  it('TC_LOGIN_009 - Password Masking', () => {
    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'password')
  })

  // TC_LOGIN_010
  it('TC_LOGIN_010 - Login With Space Character', () => {
    cy.get('input[name="username"]').type(' ')
    cy.get('input[name="password"]').type(' ')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')
  })

  // TC_LOGIN_011
  it('TC_LOGIN_011 - Keyboard Tab Navigation', () => {
    cy.get('input[name="username"]').focus()
    cy.focused().should('have.attr', 'name', 'username')
  })

  // TC_LOGIN_012
  it('TC_LOGIN_012 - Refresh After Failed Login', () => {
    cy.get('input[name="username"]').type('salah')
    cy.get('input[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.reload()

    cy.url().should('include', '/auth/login')
  })

  // TC_LOGIN_013
  it('TC_LOGIN_013 - Login After Refresh', () => {
    cy.reload()

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  })

  // TC_LOGIN_014
  it('TC_LOGIN_014 - Error Message Display', () => {
    cy.get('input[name="username"]').type('salah')
    cy.get('input[name="password"]').type('salah')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid credentials').should('be.visible')
  })

  // TC_LOGIN_015
  it('TC_LOGIN_015 - Username Field Input', () => {
    cy.get('input[name="username"]')
      .type('Admin')
      .should('have.value', 'Admin')
  })

  // TC_LOGIN_016
  it('TC_LOGIN_016 - Password Field Input', () => {
    cy.get('input[name="password"]')
      .type('admin123')
      .should('have.value', 'admin123')
  })

  // TC_LOGIN_017
  it('TC_LOGIN_017 - Stay On Login Page After Failed Login', () => {
    cy.get('input[name="username"]').type('test')
    cy.get('input[name="password"]').type('test123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/auth/login')
  })

  // TC_LOGIN_018
  it('TC_LOGIN_018 - Session Persistence', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.reload()

    cy.url().should('include', '/dashboard')
  })

  // TC_LOGIN_019
  it('TC_LOGIN_019 - Login Using Enter Key', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')

    cy.url().should('include', '/dashboard')
  })

  // TC_LOGIN_020
  it('TC_LOGIN_020 - Logout Function', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('Logout').click()

    cy.url().should('include', '/auth/login')
  })

})