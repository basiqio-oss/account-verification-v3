import fixtures from '../fixtures/example.json';

describe('Index page', () => {
  it('Should navigate to the account verification form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('a[href*="account-verification"]').click();
    cy.url().should('include', '/account-verification');
  });
});

describe('Account verification form', () => {
  beforeEach(() => {
    // Setup cypress server to route API responses and to change the behavior of network requests
    cy.server();
    cy.route('/api/**').as('api');
    cy.route('https://au-api.basiq.io/**').as('basiqApi');
  });

  it('Completes step 0 - SignUp', () => {
    // Start from the "/account-verification" page
    cy.visit('http://localhost:3000/account-verification');
    // Check the step number is 1
    cy.get('[data-cy="current-step"]').contains('1');
    // Fill out the email form field
    cy.get('#email').should('be.visible').type(fixtures.email);
    // Submit the form
    cy.get('button[type="submit"]').click();
  });

  it('Completes step 1 - PreConsent', () => {
    // Check the step number
    cy.get('[data-cy="current-step"]').contains('2');
    // Open the learn more modal
    cy.contains('Learn more').click();
    // Stub the network request to consent.basiq.io
    cy.intercept('GET', 'https://consent.basiq.io/**').as('consentRedirect');
    // Proceed to the next step, assuming this triggers the redirect
    cy.contains('Securely connect my account').click();
    // Wait for the network request to complete
    cy.wait('@consentRedirect').its('response.statusCode').should('eq', 200);
  });

/*
  it('Completes step 2 - InstitutionPicker', () => {
    // Check the step number
    cy.get('[data-cy=current-step]').contains('3');
    // Select an insitution
    cy.get(`[data-cy="institution-${fixtures.institutionId}"]`).click();
  });

  it('Completes step 3 - InstitutionLogin', () => {
    // Check the step number
    cy.get('[data-cy=current-step]').contains('4');
    // Fill out the form fields
    cy.get('#loginId').should('be.visible').type(fixtures.loginId);
    cy.get('#password').should('be.visible').type(fixtures.password);
    // Submit the form
    cy.get('button[type="submit"]').click();
    // Wait until the API call to basiq has finished
    cy.wait('@basiqApi');
    // Proceed to the next step in the from
    cy.contains('Continue').click();
    // Wait until the API call to `/api/accounts` has finished
    cy.wait('@api');
  });

  it('Completes step 4 - SelectAccount', () => {
    // Check the step number
    cy.get('[data-cy=current-step]').contains('5');
    // Select the account
    cy.get(`[data-cy="account-${fixtures.accountNumber}"]`).click();
    // Submiut the form
    cy.get('button[type="submit"]').click();
  });

  it('Completes step 5 - Summary', () => {
    // Click the done button to finish the form
    cy.contains('Done').click();
  });

  it('Shows the verified account', () => {
    // Make sure we are back on the home page
    cy.url().should('eql', 'http://localhost:3000/');
    // Make sure we have a button which shows "View verified account"
    cy.contains('View verified account').should('be.visible');
  });
  */
});
