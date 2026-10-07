import { test, expect } from '@playwright/test';
import { SauceDemoPage } from './pages/saucedemo.page';

test.describe('Automação SauceDemo - Código Refatorado com POM', () => {
  let sauceDemo: SauceDemoPage;

  // Refatoração: Inicializa a classe automaticamente antes de cada um dos 5 testes
  test.beforeEach(async ({ page }) => {
    sauceDemo = new SauceDemoPage(page);
  });

  // CT-01: Login válido
  test('1. Login com credenciais válidas', async ({ page }) => {
    await sauceDemo.login('standard_user', 'secret_sauce');
    
    await expect(page).toHaveURL(`${sauceDemo.baseUrl}inventory.html`);
    await expect(sauceDemo.pageTitle).toHaveText('Products');
  });

  // CT-02: Login inválido
  test('2. Login com credenciais inválidas', async () => {
    await sauceDemo.login('usuario_invalido', 'senha_incorreta');
    
    await expect(sauceDemo.errorMessage).toBeVisible();
    await expect(sauceDemo.errorMessage).toContainText('Username and password do not match');
  });

  // CT-03: Adicionar itens ao carrinho
  test('3. Adicionar produtos ao carrinho', async () => {
    await sauceDemo.login('standard_user', 'secret_sauce');

    await sauceDemo.adicionarAoCarrinho('sauce-labs-backpack');
    await sauceDemo.adicionarAoCarrinho('sauce-labs-bike-light');

    await expect(sauceDemo.cartBadge).toHaveText('2');
  });

  // CT-04: Remover item do carrinho
  test('4. Remover produto do carrinho', async () => {
    await sauceDemo.login('standard_user', 'secret_sauce');
    
    await sauceDemo.adicionarAoCarrinho('sauce-labs-backpack');
    await sauceDemo.removerDoCarrinho('sauce-labs-backpack');
    
    await expect(sauceDemo.cartBadge).toBeHidden();
  });

  // CT-05: Ordenação e Navegação para o Carrinho
  test('5. Ordenar produtos e navegar até o carrinho', async ({ page }) => {
    await sauceDemo.login('standard_user', 'secret_sauce');
    
    // Ordena de menor para maior preço usando o método encapsulado
    await sauceDemo.ordenarPor('lohi');
    await expect(sauceDemo.itemPrice.first()).toHaveText('\$7.99');
    
    // Adiciona o item mais barato e vai para o carrinho
    await sauceDemo.adicionarAoCarrinho('sauce-labs-onesie');
    await sauceDemo.cartLink.click();
    
    await expect(page).toHaveURL(`${sauceDemo.baseUrl}cart.html`);
    await expect(sauceDemo.pageTitle).toHaveText('Your Cart');
  });
});

 

