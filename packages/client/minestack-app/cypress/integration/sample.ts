import { selectTestId } from '../SelectTestId';

describe('テスト対象画面', () => {
  describe('大項目', () => {
    describe('中項目', () => {
      it('テスト項目1', () => {
        cy.visit('http://localhost:3000');
        cy.get(selectTestId('APP-Link')).should('be.visible')
          .and('have.text', 'Learn React');
      });

      it('API Mock Test', () => {

        /*
         * Mock
         * Note: https://docs.cypress.io/api/commands/intercept.html#Arguments
         */
        cy.intercept('GET', 'http://localhost:3000/api/test', {
          statusCode: 200,
          body      : JSON.stringify({ result: 'API Called!' })
        });

        // Test
        cy.visit('http://localhost:3000');
        cy.get(selectTestId('API-Result')).should('be.visible')
          .and('have.text', 'API Called!');
      });
    });
  });
});
