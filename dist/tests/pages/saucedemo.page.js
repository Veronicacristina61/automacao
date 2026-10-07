"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SauceDemoPage = void 0;
class SauceDemoPage {
    page;
    baseUrl;
    usernameInput;
    passwordInput;
    loginButton;
    errorMessage;
    pageTitle;
    cartBadge;
    cartLink;
    sortContainer;
    itemPrice;
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://saucedemo.com';
        // Seletores centralizados para fácil manutenção (Evita duplicidade)
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.pageTitle = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.sortContainer = page.locator('[data-test="product-sort-container"]');
        this.itemPrice = page.locator('.inventory_item_price');
    }
    // Métodos e funções reutilizáveis baseados no seu código original
    async navegar() {
        await this.page.goto(this.baseUrl);
    }
    async login(username, password) {
        await this.navegar();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async adicionarAoCarrinho(produtoId) {
        await this.page.locator(`[data-test="add-to-cart-${produtoId}"]`).click();
    }
    async removerDoCarrinho(produtoId) {
        await this.page.locator(`[data-test="remove-${produtoId}"]`).click();
    }
    async ordenarPor(opcao) {
        await this.sortContainer.selectOption(opcao);
    }
}
exports.SauceDemoPage = SauceDemoPage;
