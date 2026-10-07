## 🚀 Features and Test Scenarios Supported

The tests cover critical e-commerce flows and fully comply with the guidelines for navigation, interaction, results validation, and code reuse.

1. **CT-01: Login with valid credentials**
*Functionality:* Positive Authentication.
*Validation:* Validates the redirection to the inventory page and the display of the "Products" title.
2. **CT-02: Login with invalid credentials**
- *Functionality:* Exception Handling.
*Validation:* Ensures the correct display of the mismatched credentials error message.
3. **CT-03: Add products to cart**
- *Functionality:* Shopping Cart Management (Inclusion).
*Validation:* Checks if the quantity displayed in the floating cart icon updates dynamically.
4. **CT-04: Remove product from cart**
- *Functionality:* Shopping Cart Management (Deletion).
*Validation:* Validates the disappearance of the numerical marker from the cart after the product is deleted.
5. **CT-05: Sort products and navigate to cart**
- *Functionality:* Filters and Complex Navigation Flow.
*Validation:* Changes the sorting to lowest-highest price, checks if the cheapest item changes at the top, and validates the successful final redirection to the "Your Cart" screen.

---

## 🛠️ Refactoring Techniques Applied

- **Page Object Model (POM):** All mapping of HTML selectors and technical interactions with the page have been encapsulated in the `SauceDemoPage` class (`src/tests/pages/saucedemo.page.ts`), protecting the test suite against sudden layout changes.
- **Structural Hooks (`beforeEach`):** Automated initialization of the page and context before each scenario, eliminating duplicate code and configuration redundancies.
- **Web-First Assertions:** Use of Playwright's asynchronous assertions (`expect().toBeVisible()`), ensuring greater execution stability and eliminating desynchronization problems (flaky tests).

---

## 📂 Project Structure

```text
├── dist/ # Final compiled JavaScript code (.js)
├── src/ # Original source code in TypeScript (.ts)
│ └── tests/
│ ├── pages/
│ │ └── saucedemo.page.ts # Reusable Elements and Methods (POM)
│ └── saucedemo.spec.ts # Execution of Test Specifications
├── package.json # Dependency Manager and Script Shortcuts
├── playwright.config.ts # Playwright global settings
tsconfig.json # TypeScript compilation guidelines
```

---

## 💻 How to Execute the Project

Prerequisites
Make sure you have Node.js ( https://nodejs.org ) installed on your machine.

1. Install the project dependencies
```bash
npm install
```

2. Compile the TypeScript files (`src` ➡️ `dist`)
```bash
npx tsc
```

3. Run the automated tests
```bash
npx playwright test
```

4. Open the Playwright visual interface (UI mode)
```bash
npx playwright test --ui
```


