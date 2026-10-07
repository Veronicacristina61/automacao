import { type Page, type Locator } from '@playwright/test';

export class SauceDemoPage {
  readonly page: Page;
  readonly baseUrl: string;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly pageTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortContainer: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
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

  async login(username: string, password: string) {
    await this.navegar();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async adicionarAoCarrinho(produtoId: string) {
    await this.page.locator(`[data-test="add-to-cart-${produtoId}"]`).click();
  }

  async removerDoCarrinho(produtoId: string) {
    await this.page.locator(`[data-test="remove-${produtoId}"]`).click();
  }

  async ordenarPor(opcao: string) {
    await this.sortContainer.selectOption(opcao);
  }
}
