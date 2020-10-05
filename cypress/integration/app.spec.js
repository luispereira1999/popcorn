/// <reference types="cypress" />

describe("app", () => {
   beforeEach(() => {
      cy.visit("./app/index.html")
   })


   it("deve fazer pesquisa principal", () => {
      cy.get(".search-content").select("Música")
      cy.get(".search-text").type("Limp Bizkit")
      cy.get(".search-result").select("Músicas")
      cy.get(".search-number").type("3")
      cy.get(".btn-main-search").click()
   })


   it("deve fazer pesquisa num card", () => {
      cy.get(".search-content").select("Música")
      cy.get(".search-text").type("Limp Bizkit")
      cy.get(".search-result").select("Músicas")
      cy.get(".search-number").type("3")
      cy.get(".btn-main-search").click()
      cy.wait(2000)
      cy.get(":nth-child(1) > .card-header > .btn-card-search").click()
   })


   it("deve adicionar favorito num card", () => {
      cy.get(".search-content").select("Música")
      cy.get(".search-text").type("Limp Bizkit")
      cy.get(".search-result").select("Músicas")
      cy.get(".search-number").type("3")
      cy.get(".btn-main-search").click()
      cy.get(":nth-child(1) > .card-header > .btn-favorite").click()
   })


   it("deve remover favorito num card", () => {
      cy.get(".search-content").select("Música")
      cy.get(".search-text").type("Limp Bizkit")
      cy.get(".search-result").select("Músicas")
      cy.get(".search-number").type("3")
      cy.get(".btn-main-search").click()
      cy.get(":nth-child(1) > .card-header > .btn-favorite").click()
      cy.get(":nth-child(1) > .card-header > .btn-favorite").click()
   })


   it("deve remover favorito na lista de favoritos", () => {
      cy.get(".search-content").select("Música")
      cy.get(".search-text").type("Limp Bizkit")
      cy.get(".search-result").select("Músicas")
      cy.get(".search-number").type("3")
      cy.get(".btn-main-search").click()
      cy.get(":nth-child(1) > .card-header > .btn-favorite").click()
      cy.get(".btn-open").click()
      cy.get(".favorites-items > :nth-child(1) > .btn-del").click()
   })


   it("deve abrir lista de favoritos", () => {
      cy.get(".btn-open").click()
   })


   it("deve fechar lista de favoritos", () => {
      cy.get(".btn-open").click()
      cy.wait(2000)
      cy.get(".btn-close").click()
   })


   it("deve ir para o topo da página", () => {
      cy.get(".search-content").select("Música")
      cy.get(".search-text").type("Limp Bizkit")
      cy.get(".search-result").select("Músicas")
      cy.get(".search-number").type("3")
      cy.get(".btn-main-search").click()
      cy.scrollTo("bottom")
      cy.wait(2000)
      cy.get(".btn-up").click()
   })


   it("deve ir para o GitHub", () => {
      cy.get("a > .btn-github").click()
   })
})