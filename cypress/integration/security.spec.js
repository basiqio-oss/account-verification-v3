describe('Security regressions', () => {
  const validUserId = '11111111-1111-1111-1111-111111111111';

  beforeEach(() => {
    cy.request('POST', '/api/clear-session');
  });

  it('blocks /api/accounts and /api/client-token without a session cookie', () => {
    cy.request({
      method: 'GET',
      url: '/api/accounts',
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(401);
      expect(body.message).to.eq('Unauthorized');
    });

    cy.request({
      method: 'GET',
      url: '/api/client-token',
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(401);
      expect(body.message).to.eq('Unauthorized');
    });
  });

  it('ignores attacker-supplied userId query params on /api/accounts', () => {
    cy.request({
      method: 'GET',
      url: `/api/accounts?userId=${validUserId}`,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(401);
      expect(body.message).to.eq('Unauthorized');
    });
  });

  it('requires consent state to re-establish a session', () => {
    cy.request({
      method: 'POST',
      url: '/api/establish-session',
      body: { userId: validUserId },
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400);
      expect(body.message).to.eq('Invalid request');
    });
  });

  it('rejects forged state and does not mint av_session', () => {
    const forgedState = 'a'.repeat(48);
    cy.request({
      method: 'POST',
      url: '/api/establish-session',
      body: { userId: validUserId, state: forgedState },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Unauthorized');

      const setCookieHeader = response.headers['set-cookie'] || [];
      const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      const hasSessionCookie = cookies.some((cookie) => cookie.startsWith('av_session='));
      expect(hasSessionCookie).to.eq(false);
    });
  });

  it('does not expose a user-existence oracle on establish-session', () => {
    const forgedState = 'b'.repeat(48);
    const randomUserId = '22222222-2222-2222-2222-222222222222';

    cy.request({
      method: 'POST',
      url: '/api/establish-session',
      body: { userId: validUserId, state: forgedState },
      failOnStatusCode: false,
    }).then((first) => {
      cy.request({
        method: 'POST',
        url: '/api/establish-session',
        body: { userId: randomUserId, state: forgedState },
        failOnStatusCode: false,
      }).then((second) => {
        expect(first.status).to.eq(401);
        expect(second.status).to.eq(401);
      });
    });
  });

  it('blocks /api/create-consent-state without a valid session cookie', () => {
    cy.request({
      method: 'POST',
      url: '/api/create-consent-state',
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(401);
      expect(body.message).to.eq('Unauthorized');
    });
  });

  it('rate limits /api/create-user abuse', () => {
    const testIp = `203.0.113.${Date.now() % 200}`;
    const req = () => cy.request({
      method: 'POST',
      url: '/api/create-user',
      failOnStatusCode: false,
      headers: { 'x-forwarded-for': testIp },
      body: { email: 'invalid-email' },
    });

    for (let i = 0; i < 5; i += 1) {
      req().its('status').should('eq', 400);
    }

    req().then(({ status, body }) => {
      expect(status).to.eq(429);
      expect(body.message).to.eq('Too many requests');
    });
  });

  it('does not try to establish session from sessionStorage without consent state in URL', () => {
    cy.intercept('POST', '/api/establish-session').as('establishSession');

    cy.visit('/account-verification', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem('userId', validUserId);
      },
    });

    cy.get('@establishSession.all').should('have.length', 0);
  });

  it('serves baseline security headers', () => {
    cy.request('/').then(({ headers }) => {
      expect(headers).to.have.property('x-frame-options', 'DENY');
      expect(headers).to.have.property('x-content-type-options', 'nosniff');
      expect(headers).to.have.property('referrer-policy', 'strict-origin-when-cross-origin');
      expect(headers).to.have.property('permissions-policy');
      expect(headers).to.have.property('strict-transport-security');
    });
  });
});