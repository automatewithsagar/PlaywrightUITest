const { test, expect, chromium } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.describe('Material Filter Functionality', () => {
  test('should login and verify filters work as expected', async () => {
    // Launch browser in incognito mode
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const materialFilterPage = poManager.getMaterialFilterPage();

    // Step 1: Navigate to login page
    await materialFilterPage.goto();

    
    // Step 2: Login
    await materialFilterPage.login('adminuser0002232011@email.com', 'CustomerPO!21');

    await page.locator('#CybotCookiebotDialogBodyButtonDecline').click();
    
    // Step 3: Apply a filter and check material count changes
    // Example selectors, adjust as per actual filter UI
    const filterSelector = '.facet__list .facet__name'; // e.g., first filter
    const valueSelector = '.facet__list .facet__value input[type="checkbox"]'; // e.g., first value
    const initialCount = await materialFilterPage.getMaterialCount();
    await materialFilterPage.applyFilter(filterSelector, valueSelector);
    const filteredCount = await materialFilterPage.getMaterialCount();
    expect(filteredCount).not.toBe(initialCount);

    await browser.close();
  });
});
