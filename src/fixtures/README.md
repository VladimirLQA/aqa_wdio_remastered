# Playwright-Style Fixture System

## Overview

This fixture system is inspired by Playwright's fixture pattern, providing a single entry point (`test`) that can be extended with any fixtures you need. Start with an empty base fixture and extend it with pages, services, or any custom objects.

## Core Concept

```typescript
import { test } from '../fixtures/base.fixture.ts';

// Start with empty test and extend with what you need
const myTest = test.extend({
  customService: () => new CustomService(),
  testData: () => ({ name: 'test', value: 123 }),
});

myTest('My test', async ({ customService, testData }) => {
  // Use your fixtures
});
```

## Basic Usage

### 1. Start with Base Test (Empty Fixture)

```typescript
import { test } from '../fixtures/base.fixture.ts';

// Extend with custom fixtures
const customTest = test.extend({
  apiClient: () => new ApiClient(),
  database: () => ({ connect: () => 'connected' }),
});

customTest('Custom test', async ({ apiClient, database }) => {
  // Your test logic
});
```

### 2. Use Pre-configured Fixtures

```typescript
import { pageTest, productPageTest, serviceTest, fullTest } from '../fixtures/base.fixture.ts';

// Page fixtures - includes signInPage, homePage
pageTest('Login test', async ({ signInPage, homePage }) => {
  await signInPage.open();
  await homePage.waitForPageOpened();
});

// Product page fixtures - includes all pages + product pages
productPageTest('Product test', async ({ signInPage, productsPage, addNewProductPage }) => {
  // All page objects available
});

// Service fixtures - includes services only
serviceTest('Service test', async ({ signInPageService, homePageService }) => {
  // Service objects available
});

// Full fixtures - includes both pages and services
fullTest('Full test', async ({ signInPage, signInPageService, productsPage }) => {
  // Both pages and services available
});
```

## Advanced Patterns

### Chain Extensions

```typescript
import { pageTest } from '../fixtures/base.fixture.ts';

const extendedTest = pageTest
  .extend({
    testData: () => ({ productName: 'Test Product' }),
  })
  .extend({
    logger: () => ({ log: (msg: string) => console.log(msg) }),
  });

extendedTest('Chained test', async ({ signInPage, testData, logger }) => {
  logger.log(`Testing with ${testData.productName}`);
});
```

### Async Fixture Initialization

```typescript
const asyncTest = test.extend({
  database: async () => {
    const db = new Database();
    await db.connect();
    return db;
  },
  config: async () => {
    const response = await fetch('/api/config');
    return response.json();
  },
});
```

### Conditional Fixtures

```typescript
const conditionalTest = test.extend({
  mockService: () => process.env.NODE_ENV === 'test' ? new MockService() : new RealService(),
  feature: () => ({ enabled: process.env.FEATURE_FLAG === 'true' }),
});
```

## Test Hooks with Fixtures

All test functions support hooks that receive the same fixtures:

```typescript
pageTest.describe('Test Suite', () => {
  pageTest.beforeEach(async ({ signInPage }) => {
    await signInPage.open();
  });

  pageTest.afterEach(async ({ signInPage }) => {
    await signInPage.deleteCookies(['Authorization']);
  });

  pageTest('Test case', async ({ homePage }) => {
    // Test logic
  });
});
```

## Tag-Based Test Execution

### Adding Tags

```typescript
import { TAGS } from '../utils/tags.ts';

// Single tag
pageTest('Smoke test', { tag: TAGS.SMOKE }, async ({ homePage }) => {
  // Test logic
});

// Multiple tags
pageTest('Multi-tag test', { tag: [TAGS.SMOKE, TAGS.REGRESSION] }, async ({ homePage }) => {
  // Test logic
});

// Suite tags
pageTest.describe('Tagged Suite', { tag: TAGS.SMOKE }, () => {
  pageTest('Test in tagged suite', async ({ homePage }) => {
    // Inherits suite tag
  });
});
```

### Running Tests by Tags

```bash
# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run both smoke and regression tests
npm run test:smoke-regression

# Custom tags
WDIO_TAGS="(@SMOKE)" npm run test
```

## Available Pre-configured Fixtures

### pageTest
- `signInPage: SignInPage`
- `homePage: HomePage`

### productPageTest (extends pageTest)
- All from pageTest +
- `productsPage: ProductsPage`
- `addNewProductPage: AddNewProductPage`

### serviceTest
- `signInPageService: typeof signInPageService`
- `homePageService: typeof homePageService`

### productServiceTest (extends serviceTest)
- All from serviceTest +
- `productsPageService: typeof productsPageService`
- `addNewProductPageService: typeof addNewProductPageService`

### fullTest (combines productPageTest + productServiceTest)
- All pages and services

## Best Practices

### 1. Start Small and Extend
```typescript
// ✅ Good - start with base and add what you need
const myTest = test.extend({
  specificService: () => new SpecificService(),
});

// ❌ Avoid - using full fixtures when you only need specific ones
const myTest = fullTest; // Brings in everything
```

### 2. Create Domain-Specific Fixtures
```typescript
// Create fixtures for specific feature areas
const authTest = test.extend({
  authService: () => new AuthService(),
  userFactory: () => new UserFactory(),
});

const paymentTest = test.extend({
  paymentGateway: () => new PaymentGateway(),
  mockBank: () => new MockBankService(),
});
```

### 3. Share Fixtures Across Tests
```typescript
// fixtures/auth.fixture.ts
export const authTest = test.extend({
  authService: () => new AuthService(),
  currentUser: async () => {
    const service = new AuthService();
    return await service.getCurrentUser();
  },
});

// Use in multiple test files
import { authTest } from '../fixtures/auth.fixture.ts';
```

### 4. Environment-Specific Fixtures
```typescript
const envTest = test.extend({
  apiUrl: () => process.env.API_URL || 'http://localhost:3000',
  timeout: () => process.env.CI ? 30000 : 10000,
});
```

## Migration from Legacy Fixture System

If you have existing tests using the old fixture system:

1. Replace specific fixture imports with base `test` and extend:
   ```typescript
   // Old
   import { pageTest } from '../fixtures/base.fixture.ts';
   
   // New
   import { test } from '../fixtures/base.fixture.ts';
   const myTest = test.extend({
     signInPage: () => new SignInPage(),
     homePage: () => new HomePage(),
   });
   ```

2. Or use pre-configured fixtures:
   ```typescript
   // Old
   import { pageTest } from '../fixtures/base.fixture.ts';
   
   // New (same thing)
   import { pageTest } from '../fixtures/base.fixture.ts';
   ```

3. Add tags to tests for better organization.

## Available Tags

- `@SMOKE` - Quick smoke tests
- `@REGRESSION` - Full regression tests  
- `@SERIAL` - Tests that must run serially
- `@GLOBAL_SETUP` - Tests requiring global authentication setup