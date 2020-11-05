class Requests {

    getPing() {
        return cy.request({
            method: 'GET',
            url: '/ping'
        })
    }

    getBooking(){
        return cy.request({
            method: 'GET',
            url: '/booking/1',
        })
    }

    postBooking() {
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Breakfast"
            }
        })
    }

    updateBookingWithoutToken(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `booking/${id}`,
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : false,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Lunch"
            }
        })
    }

    updateBooking(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : false,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Lunch"
            }
        })
    }

    updateBookingNotExist(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `booking/xxxx`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : false,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Lunch"
            }
        })
    }

    updateBookingTokenInvalid(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('tokenInvalid')}`
            },
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : false,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Lunch"
            }
        })
    }

    postAuth() {
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username" : "admin",
                "password" : "password123"
            }
        });
    }

    doAuth(){
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token
            Cypress.env('token', token)
        })
    }

    deleteBooking(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            }
         })
    }

    deleteBookingNotExist(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `booking/xxxx`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            }
         })
    }

    deleteBookingWithoutToken(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `booking/${id}`
         })
    }

    deleteBookingTokenInvalid(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('tokenInvalid')}`
            }
         })
    }
}

export default new Requests()