import RecruitmentPage from '../pages/RecruitmentPage.Project'
import LoginPage from '../pages/LoginPage.Project'

describe('RECRUITMENT FEATURE', () => {

    let recruitmentData

    before(() => {
        cy.fixture('RecruitmentData.Project').then((data) => {
            recruitmentData = data
        })
    })

    beforeEach(() => {

        LoginPage.visitLoginPage()
        LoginPage.inputUsername('Admin')
        LoginPage.inputPassword('admin123')
        LoginPage.clickLogin()

        cy.intercept('GET', '**/api/v2/recruitment/**').as('recruitmentAPI')
        cy.intercept('GET', '**/api/v2/admin/job-titles*').as('jobTitles')
        cy.intercept('GET', '**/api/v2/recruitment/vacancies*').as('vacancies')

        RecruitmentPage.clickRecruitmentMenu()

        cy.wait('@recruitmentAPI')
    })

    // TC_REC_001
    it('TC_REC_001 - Search candidate valid', () => {

        cy.intercept('GET', '**/api/v2/recruitment/**').as('searchCandidate')

        RecruitmentPage.inputCandidateName(recruitmentData.validCandidate.name)
        RecruitmentPage.clickSearch()

        cy.wait('@searchCandidate', { timeout: 10000 })

        RecruitmentPage.verifyCandidateFound()
    })

    // TC_REC_002
    it('TC_REC_002 - Search candidate tidak ditemukan', () => {

        cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('searchNotFound')

        RecruitmentPage.searchCandidate('Test Candidate')

        cy.wait('@searchNotFound')
    })

    // TC_REC_003
    it('TC_REC_003 - Filter berdasarkan Vacancy', () => {

        cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('filterVacancy')

        RecruitmentPage.selectVacancy(recruitmentData.vacancy.name)
        RecruitmentPage.clickSearch()

        cy.wait('@filterVacancy')

        RecruitmentPage.verifyDataDisplayed()
    })

    // TC_REC_004
    it('TC_REC_004 - Filter berdasarkan Hiring Manager', () => {

        cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('filterCandidates')
        cy.intercept('GET', '**/api/v2/core/employees*').as('employees')

        RecruitmentPage.selectHiringManager(
            recruitmentData.hiringManager.name
        )

        cy.wait('@employees')

        RecruitmentPage.clickSearch()

        cy.wait('@filterCandidates')

        RecruitmentPage.verifyDataDisplayed()
    })

    // TC_REC_005
    it('TC_REC_005 - Filter berdasarkan Status', () => {

        cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('filterStatus')

        RecruitmentPage.selectStatus(recruitmentData.status.name)
        RecruitmentPage.clickSearch()

        cy.wait('@filterStatus')

        RecruitmentPage.verifyDataDisplayed()
    })

    // TC_REC_006
    it('TC_REC_006 - Reset filter Recruitment', () => {

        cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('resetRecruitment')

        RecruitmentPage.inputCandidateName(recruitmentData.validCandidate.name)

        RecruitmentPage.clickReset()

        cy.wait('@resetRecruitment')

        cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 })
          .first()
          .should('have.value', '')
    })

    // TC_REC_007
    it('TC_REC_007 - Tambah kandidat baru', () => {

        cy.intercept('POST', '**/api/v2/recruitment/candidates').as('addCandidate')

        RecruitmentPage.clickAdd()

        RecruitmentPage.inputFirstName(recruitmentData.newCandidate.firstName)
        RecruitmentPage.inputLastName(recruitmentData.newCandidate.lastName)
        RecruitmentPage.inputEmail(recruitmentData.newCandidate.email)
        RecruitmentPage.inputContact(recruitmentData.newCandidate.contact)

        RecruitmentPage.clickSave()

        cy.wait('@addCandidate')

        RecruitmentPage.verifyCandidateSaved()
    })

    // TC_REC_008
    it('TC_REC_008 - Navigasi ke menu Recruitment', () => {

        RecruitmentPage.clickRecruitmentMenu()

        RecruitmentPage.verifyRecruitmentPage()
    })
})