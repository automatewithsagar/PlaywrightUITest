const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('Contact page should display Feedback or Questions section', async ({ browser }) => {
    // Always use incognito context
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);

    // 1. Navigate to login page
    await page.goto('https://accstorefront.ce0szhuj4u-siegwerkd1-s1-public.model-t.cc.commerce.ondemand.com/en/login');

    // 2. Login
    await page.fill('input[name="j_username"]', 'adminuser0002232011@email.com');
    await page.fill('input[name="j_password"]', 'CustomerPO!21');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');

    // 2.1 Wait for cookie dialog and accept only necessary cookies
    await page.locator('#CybotCookiebotDialogBodyButtonDecline').click();
    await page.locator('#CybotCookiebotDialog').waitFor({ state: 'hidden', timeout: 10000 });
    

    // 3. Scroll to footer and click CONTACT link (force click in case of overlay)
    const contactLink = page.locator("a[href*='contact']");
    await contactLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Give time for UI to settle
    await contactLink.click({ force: true });
    await page.waitForLoadState('networkidle');

    // 4. Verify CONTACT page is open and has Feedback or Questions section
    const contactPage = poManager.getContactPage();
    const isVisible = await contactPage.isContactPageOpen();
    expect(isVisible).toBeTruthy();

    await context.close();
});
