import { NORMAL_DELAY, addButton, circle, clearButton, pageMainInput, removeButton, stackLink, visualizationElement, visualizationGrid } from "./constants/selectrs";

const inputAmount = Math.floor(Math.random() * 4) + 2;
describe('service is available', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
        cy.get(stackLink).click();
    });
    //1
    it('if input empty button should be disabled', function () {
        cy.get(pageMainInput).clear();
        cy.get(addButton).should('be.disabled')
    });
    //2
    it('add proccess should be correct', function () {
        for (let i = 0; i < inputAmount; i++) {
            cy.get(pageMainInput).type(i);
            cy.get(addButton).click();

            //
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === i ) {
                    cy.wrap(element).children('[class*=circle_changing]');
                }
            });
            cy.wait(NORMAL_DELAY);
            //
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === i) {
                    cy.wrap(element).children('[class*=circle_default]');
                }
            });
        }
    });
    //3
    it('remove proccess should be correct', function () {
        for (let i = 0; i < inputAmount; i++) {
            cy.get(pageMainInput).type(i);
            cy.get(addButton).click();
            cy.wait(NORMAL_DELAY);
        }

        for (let i = inputAmount-1; i >=0; i--) {
            cy.get(pageMainInput).type(i);
            cy.get(removeButton).click();

            //
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === i) {
                    cy.wrap(element).children('[class*=circle_changing]');
                }
            });
            cy.wait(NORMAL_DELAY);
            //

            cy.get(visualizationGrid).find(visualizationElement).should('have.length', i);
            if (i > 0) {
                cy.get(visualizationGrid).find(circle).each((element, index) => {
                    cy.wrap(element).children('[class*=circle_default]');
                });
            }
        }
    });
    //4
    it('clear proccess should be correct', function () {
        for (let i = 0; i < inputAmount; i++) {
            cy.get(pageMainInput).type(i);
            cy.get(addButton).click();
            cy.wait(NORMAL_DELAY);
        }
        cy.get(clearButton).click();
        cy.get(visualizationGrid).find(visualizationElement).should('have.length', 0);
    });

});