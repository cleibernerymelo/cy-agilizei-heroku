/// <reference types="cypress" />
import req from '../support/api/requests'
import assertions from '../support/api/assertions'

context('Ping', () => {
    it('GET HealthCheck @healtcheck', () => {
        req.getPing().then(getPingResponse => {
            assertions.shouldHaveStatus(getPingResponse, 201)
        })
    });
    //cy.request retornar --> response - body - headers
    //cy.its --> com esse comando posso passar qual proprieade desejo utilizar
});


