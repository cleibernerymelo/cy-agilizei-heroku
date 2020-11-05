/// <reference types="cypress" />
import spok from 'cy-spok'
import req from '../support/api/requests'
import assertions from '../support/api/assertions'
import schemas from '../support/api/schemas'

context('Booking', () => {
    before(() => {
        req.doAuth()
    });
    it('Validar o contrato do GET Booking @contract', () => {
        req.getBooking().then(getBookingResponse => {
            assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
        })
    })

    it('Criar uma reserva com suecesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldbookingIdBePresent(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)
            assertions.shouldDurationBeFast(postBookingResponse)

/*             return cy.request({
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
            }) */

            //expect(postBookingResponse.body.bookingid, 'bookingid exists').to.not.be.null
/*             expect(postBookingResponse.headers, 'default headers').to.include({
                server: 'Cowboy',
                connection: 'keep-alive',
                'x-powered-by': 'Express'
            }) */

/*             expect(postBookingResponse.headers, 'content type').to.include({
                'content-type': 'application/json; charset=utf-8'
            }) */

            /* expect(postBookingResponse.duration, 'duration').lessThan(900) */
        })
    })

    
//Tentar alterar uma reserva sem token --> 403
    it('Tentar alterar uma reserva sem id @functional', () => {
        req.postBooking().then(postBookingResponse => {
     /*        const id = postBookingResponse.body.bookingid
            cy.request({
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
            }) */
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

//Alterar uma reserva com sucesso --> 200
    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)
            })
        })
    })

    it('Alterar uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingNotExist(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 405)
            })
        })
    })

    it('Alterar uma reserva com token invalido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingTokenInvalid(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    })

//tentar excluir uma reserva sem token -> 403
//tentar excluir uma reserva com token invalido --> 403
//excluir uma reserva com sucesso --> 201

    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse,201)
            })
        })
    });

    it('Excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingNotExist(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse,405)
            })
        })
    });

    it('Excluir uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse,403)
            })
        })
    });

    it('Excluir uma reserva com token invalid @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingTokenInvalid(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse,403)
            })
        })
    });
})

//Categorização de testes
//1.Prioridades
//criticos
//medios
//baixa
//2.Tippos
//healtCheck
//contrato
//funcionais
//3.Funcionalidades
//ping
//booking
//auth

//para isso utilizaremos o plugin cypress-select-tests npm install --save-dev cypress-select-tests