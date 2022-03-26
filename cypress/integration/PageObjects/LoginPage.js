///<reference types = "cypress"/>

class LoginPage {

    VisitURL() {
        cy.visit('https://letcode.in/signin')
    }

    fillEmail(value) {
        cy.get('input[name=email]')
            .clear()
            .click()
            .type("email")
        return this;
    }

    fillPassword(value) {
        cy.get('input[]')
            .clear()
            .click()
            .type(data.password)
        return this;
    }

    loginButton() {
        cy.get()
            .click()
            
    }

}
export default LoginPage