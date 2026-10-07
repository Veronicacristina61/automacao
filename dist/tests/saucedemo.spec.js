"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const saucedemo_page_1 = require("./pages/saucedemo.page");
test_1.test.describe('Automação SauceDemo - Código Refatorado com POM', () => {
    let sauceDemo;
    // Refatoração: Inicializa a classe automaticamente antes de cada um dos 5 testes
    test_1.test.beforeEach(async ({ page }) => {
        sauceDemo = new saucedemo_page_1.SauceDemoPage(page);
    });
    // CT-01: Login válido
    (0, test_1.test)('1. Login com credenciais válidas', async ({ page }) => {
        await sauceDemo.login('standard_user', 'secret_sauce');
        await (0, test_1.expect)(page).toHaveURL(`${sauceDemo.baseUrl}inventory.html`);
        await (0, test_1.expect)(sauceDemo.pageTitle).toHaveText('Products');
    });
    // CT-02: Login inválido
    (0, test_1.test)('2. Login com credenciais inválidas', async () => {
        await sauceDemo.login('usuario_invalido', 'senha_incorreta');
        await (0, test_1.expect)(sauceDemo.errorMessage).toBeVisible();
        await (0, test_1.expect)(sauceDemo.errorMessage).toContainText('Username and password do not match');
    });
    // CT-03: Adicionar itens ao carrinho
    (0, test_1.test)('3. Adicionar produtos ao carrinho', async () => {
        await sauceDemo.login('standard_user', 'secret_sauce');
        await sauceDemo.adicionarAoCarrinho('sauce-labs-backpack');
        await sauceDemo.adicionarAoCarrinho('sauce-labs-bike-light');
        await (0, test_1.expect)(sauceDemo.cartBadge).toHaveText('2');
    });
    // CT-04: Remover item do carrinho
    (0, test_1.test)('4. Remover produto do carrinho', async () => {
        await sauceDemo.login('standard_user', 'secret_sauce');
        await sauceDemo.adicionarAoCarrinho('sauce-labs-backpack');
        await sauceDemo.removerDoCarrinho('sauce-labs-backpack');
        await (0, test_1.expect)(sauceDemo.cartBadge).toBeHidden();
    });
    // CT-05: Ordenação e Navegação para o Carrinho
    (0, test_1.test)('5. Ordenar produtos e navegar até o carrinho', async ({ page }) => {
        await sauceDemo.login('standard_user', 'secret_sauce');
        // Ordena de menor para maior preço usando o método encapsulado
        await sauceDemo.ordenarPor('lohi');
        await (0, test_1.expect)(sauceDemo.itemPrice.first()).toHaveText('\$7.99');
        // Adiciona o item mais barato e vai para o carrinho
        await sauceDemo.adicionarAoCarrinho('sauce-labs-onesie');
        await sauceDemo.cartLink.click();
        await (0, test_1.expect)(page).toHaveURL(`${sauceDemo.baseUrl}cart.html`);
        await (0, test_1.expect)(sauceDemo.pageTitle).toHaveText('Your Cart');
    });
});
