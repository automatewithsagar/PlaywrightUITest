const {test,expect} = require('@playwright/test');

test('Testing new changes',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://accstorefront.ce0szhuj4u-siegwerkd1-s1-public.model-t.cc.commerce.ondemand.com/en/login');
    //console.log(await page.title());
    await expect(page).toHaveTitle('my.Siegwerk Staging: Sign In');

    await page.locator('#j_username').fill('adminuser0002232011@email.com');
    await page.locator('#j_password').fill('CustomerPO!21');
    await page.locator('#logOnFormSubmit').click();

    const product = '70-817102-0.1200';
    const cleanProduct = product.replace(/[^a-zA-Z0-9]/g, '');
    const searchProduct = '00000'+cleanProduct;

    await page.locator('#CybotCookiebotDialogBodyButtonDecline').click();
    await expect(page).toHaveTitle("Purchasing | Customer Portal");

    const searchInput = await page.locator('#js-site-search-input');
    await searchInput.fill(product);
    await searchInput.press('Enter');

    await page.locator(`//button[@prdcode='${searchProduct}']/following-sibling::button`).click();

    await page.locator("//a[@title='go to cart']/span").nth(0).click();

    await page.locator(".page-cart-table.col-12").waitFor();

    const text = await page.locator(".material-details a[href*='7081710201200']").textContent();
    expect(text).toContain(product);

    //click checkout
    await page.locator(".btn--continue-checkout").click();

    


    


})