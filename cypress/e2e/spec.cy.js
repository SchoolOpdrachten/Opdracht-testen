/// <reference types="cypress" />

describe('tests van het invullen van de boeking form', () => {
    const email = 'test@mail.com'
    const geenEmail = 'testmail.com'
    const aantal = 5
    const teGrootAantal = 15

    beforeEach(() => {
        cy.visit('https://localhost:44466/boek') // het kan zijn dat de port anders is. maar deze port werkte bij mij
    })

    it('vult de boeking form correct in', () => {
        cy.get('.dagenContainer').children().first().children().first().click() // container bevat item, item bevat de dag, dag bevat de input en span
        cy.get('input[name=email').type(email)
        cy.get('input[name=aantal').type(aantal)
        cy.get('button[type=submit').click()

        cy.get('#result').should('contain', 'Boeking is gelukt')
    })

    it('vult de boeking form fout in', () => {
        cy.get('.dagenContainer').children().first().children().first().click() // container bevat item, item bevat de dag, dag bevat de input en span
        cy.get('input[name=email').type(email)
        cy.get('input[name=aantal').type(teGrootAantal)
        cy.get('button[type=submit').click()

        cy.get('#result').should('contain', 'Er is niet meer plek op deze dag. Minder het aantal mensen')
    })

})

describe('andere pagina verzonden ', () => {
    it('Navigeren naar boekenpagina', () => {
        cy.visit('https://localhost:44466/')
        cy.get('#naarBoeken').click()
        cy.wait(500)
        cy.url().should('include', '/boek')
    })
})

describe('intercept', () => {
    it('intercept', () => {
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:44466/reservering/reservering',
        }, (request) => {
            assert.deepEqual(request.body, [8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10])
        }
        )
    })
})