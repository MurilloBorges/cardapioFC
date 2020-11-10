/* eslint-disable no-undef */
/// <reference types="Cypress" />
/// <reference path="../support/commands.js" />

describe('Action happy path application', () => {
  beforeEach(() => {
    cy.fixture('categories.json').as('category');
    cy.fixture('drinks.json').as('drink');
  });

  it('Realizando teste de carregamento de categorias', function () {
    cy.log('Testando o carregamento das categorias');
    cy.visit('/categories');
    const { category } = this;

    cy.server();
    cy.route({
      method: 'GET',
      url: 'list.php?c=list',
    }).as('getCategories');

    cy.dataCy('button-get-drinks').contains(category.valid.category).click();
  });

  it('Realizando teste de carregamento dos drinks', function () {
    cy.log('Testando o carregamento dos drinks');
    const { drink, category } = this;
    cy.server();
    cy.route({
      method: 'GET',
      url: `filter.php?c=${category.valid.category}`,
    }).as('getDrinks');

    cy.dataCy('button-details').contains(drink.valid.drink).click({ force: true });
  });

  it('Realizando teste de carregamento dos detalhes dos drinks', function () {
    cy.log('Testando o carregamento dos detalhes dos drinks');
    const { drink } = this;

    cy.server();
    cy.route({
      method: 'GET',
      url: `search.php?s=${drink.valid.drink}`,
    }).as('getDrinkDetails');

    cy.dataCy('button-ok').click({ force: true });
    cy.dataCy('come-back').click({ force: true });
  });
});
