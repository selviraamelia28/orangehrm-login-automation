import DirectoryPage from '../pages/DirectoryPage.Project'
import LoginPage from '../pages/LoginPage.Project'

describe('DIRECTORY FEATURE', () => {

    let directoryData

    before(() => {
        cy.fixture('DirectoryData.Project').then((data) => {
            directoryData = data
        })
    })

    beforeEach(() => {

        LoginPage.visitLoginPage()
        LoginPage.inputUsername('Admin')
        LoginPage.inputPassword('admin123')
        LoginPage.clickLogin()

        DirectoryPage.clickDirectoryMenu()
        
        cy.url().should('include', '/directory/viewDirectory')
    })

    // TC_DIR_001
    it('TC_DIR_001 - Search employee valid', () => {

        cy.intercept('GET', '**/api/v2/directory/employees*').as('searchEmployee')

        DirectoryPage.inputEmployeeName(directoryData.validEmployee.name)
        DirectoryPage.clickSearch()

        cy.wait('@searchEmployee')

        DirectoryPage.verifyEmployeeFound(directoryData.validEmployee.name)
    })

    // TC_DIR_002
    it('TC_DIR_002 - Search employee tidak ditemukan', () => {

        cy.intercept('GET', '**/api/v2/directory/employees*').as('searchNotFound')

        DirectoryPage.inputEmployeeName(directoryData.invalidEmployee.name)
        DirectoryPage.clickSearch()

        cy.wait('@searchNotFound')

        DirectoryPage.verifyNoRecordFound()
    })

    // TC_DIR_003
    it('TC_DIR_003 - Search menggunakan sebagian nama', () => {

        cy.intercept('GET', '**/api/v2/directory/employees*').as('searchPartial')

        DirectoryPage.inputEmployeeName(directoryData.partialEmployee.name)
        DirectoryPage.clickSearch()

        cy.wait('@searchPartial')

        DirectoryPage.verifyEmployeeFound(directoryData.partialEmployee.name)
    })

    // TC_DIR_004
    it('TC_DIR_004 - Search berdasarkan Job Title', () => {

        cy.intercept({
            method: 'GET',
            pathname: '/web/index.php/api/v2/directory/employees'
        }).as('searchJob')

        DirectoryPage.selectJobTitle(directoryData.jobTitle.title)
        DirectoryPage.clickSearch()

        cy.wait('@searchJob', { timeout: 10000 })

        DirectoryPage.verifyDataDisplayed()
    })

    // TC_DIR_005
    it('TC_DIR_005 - Search berdasarkan Location', () => {

        cy.intercept({
            method: 'GET',
            pathname: '/web/index.php/api/v2/directory/employees'
        }).as('searchLocation')

        DirectoryPage.selectLocation(directoryData.location.name)
        DirectoryPage.clickSearch()

        cy.wait('@searchLocation', { timeout: 10000 })

        DirectoryPage.verifyDataDisplayed()
    })

    // TC_DIR_006
    it('TC_DIR_006 - Reset filter pencarian', () => {

        DirectoryPage.inputEmployeeName(directoryData.validEmployee.name)

        cy.intercept({
            method: 'GET',
            pathname: '/web/index.php/api/v2/directory/employees'
        }).as('resetDirectory')

        DirectoryPage.clickReset()

        cy.wait('@resetDirectory')

        cy.wait(1000)

        DirectoryPage.verifyInputEmpty()
    })

    // TC_DIR_007
    it('TC_DIR_007 - Search dengan field kosong', () => {

        cy.intercept({
            method: 'GET',
            pathname: '/web/index.php/api/v2/directory/employees'
        }).as('searchBlank')
        
        DirectoryPage.clickSearch()

        cy.wait('@searchBlank')

        DirectoryPage.verifyDataDisplayed()
    })

    // TC_DIR_008
    it('TC_DIR_008 - Navigasi ke menu Directory', () => {

        DirectoryPage.clickDirectoryMenu()

        DirectoryPage.verifyDirectoryPage()
    })
})