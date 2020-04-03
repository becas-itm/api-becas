describe('Login Form', () => {
  beforeEach(() => cy.visit('/login'));

  it('greets with "Iniciar sesión — Becas"', () => {
    cy.contains('h1', 'Iniciar sesión — Becas');
  });

  it('links to /recuperar', () => {
    cy.contains('¿Olvidaste tu contraseña?').should(
      'have.attr',
      'href',
      '/recuperar',
    );
  });

  it('requires an email', () => {
    cy.findByTestId('submit-button').click();
    cy.findByTestId('email-validation').should('contain', 'Ingresa tu correo');
  });

  it('requires a password', () => {
    cy.findByTestId('password').type('{enter}');
    cy.findByTestId('password-validation').should(
      'contain',
      'Ingresa una contraseña',
    );
  });

  it('requires valid email and password', () => {
    cy.findByTestId('email').type('john@doe.');
    cy.findByTestId('password').type('short{enter}');

    cy.findByTestId('email-validation').should(
      'contain',
      'Correo electrónico no válido',
    );

    cy.findByTestId('password-validation').should(
      'contain',
      'Ingresa como mínimo 6 carácteres',
    );
  });

  it('navigates to /admin on successful login', () => {
    cy.findByTestId('email').type('john@doe.com');
    cy.findByTestId('password').type('1234567890{enter}');
    cy.location('pathname').should('equal', '/admin');
    cy.reload();
  });
});
