/// <reference types = "cypress"/>

import LoginPage from "./PageObjects/LoginPage"; "../integration/PageObjects/LoginPage"

describe('LetCode Tests', function () {
    let data;
    before(function () {
        cy.visit('https://letcode.in/test')

        cy.fixture('example').then(fileData => {
            data = fileData;
        });
    });

    it('Test 1 - Verify Page Title', function () {
        cy.title().should('eq', 'LetCode - Testing Hub')
        cy.get(':nth-child(2) > .hero-body > div.container > .columns > :nth-child(1) > app-menu > .card > .card-header > .card-header-title').contains('Input')

        // Click on Input card for application Form page
        cy.get(':nth-child(2) > .hero-body > div.container > .columns > :nth-child(1) > app-menu > .card > .card-footer > .card-footer-item').click()
    })

    it('Test 2 - Fill-up application form', function () {
        cy.get(':nth-child(1) > .label').contains('Enter your full Name')
        cy.get('#fullName').type("Kaizen")

        cy.get(':nth-child(2) > .label').should('be.visible')
        cy.get('#join').clear().type("Field 2")

        cy.get(':nth-child(3) > .label').should('be.visible')

        cy.get(':nth-child(5) > .label').should('be.visible')
        cy.get('#noEdit').should('be.disabled')
    })

    // Alert box in Cypress
    it('Test 3 - Alerts', function () {
        cy.visit('https://letcode.in/test')// Click on "back" button in the browser
        cy.contains('Alert')
        cy.get(':nth-child(2) > .hero-body > div.container > .columns > :nth-child(4) > app-menu > .card > .card-footer > .card-footer-item').click()
        cy.get('#accept').click()

        //Alert in Cypress
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Hey! Welcome to LetCode')
        });

        //Confirm-Alert in Cypress
        cy.get('#confirm').click()
        cy.on('window:confirm', (text) => {
            expect(text).to.contain('Are you happy with LetCode?')
        })

        //Prompt-Alert in Cypress
        cy.window().then(function (p) {
            cy.stub(p, 'prompt').returns("Welcome Kaizen")
            cy.get('#prompt').click();
        })

        cy.go('back')
        cy.get('.navbar-burger').click()
        cy.get('[href="/signin"]').click()
    })

    // Data Driven testing using Json files
    it('Test 4 - Login functionality', function () {
        const login = new LoginPage();

        login.VisitURL()
        login.fillEmail('email')


        cy.get(':nth-child(2) > .control > .input')
            .clear()
            .click()
            .type(data.password)

        cy.get('.navbar-burger').click()
        cy.get('#testing').click()
        cy.title().should('eq', 'LetCode - Testing Hub')
    })

    // iFrames in Cypress
    it('Test 5 - iFrames', function () {
        cy.get(':nth-child(4) > .hero-body > div.container > .columns > :nth-child(1) > app-menu > .card > .card-header > .card-header-title').contains('Frame')
        cy.get(':nth-child(4) > .hero-body > div.container > .columns > :nth-child(1) > app-menu > .card > .card-footer > .card-footer-item').click()

        cy.get('#firstFr').within(function ($iFrame) {
            // then is used to resolve things in JS
            const iFrameContent = $iFrame.contents().find('body')

            // to interact with JS or Jquery elements on DOM we need to wrap them in cypress for us to access those elements
            cy.wrap(iFrameContent).find('input[name=fname]').type(data.fname)

            cy.wrap(iFrameContent).find('input[name=lname]').type(data.lname)

        })
    })

})
