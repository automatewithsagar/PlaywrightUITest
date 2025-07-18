const { test, expect, requet } = require('@playwright/test');
let webContext;
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("dahiyasagar90@gmail.com");
    await page.locator("#userPassword").fill("Physics.123");
    await page.locator("[value='Login']").click();
    await products.first().waitFor();
    await context.storageState({ path: 'state.json' }); //store all the content in storage session in the file state.json
    webContext = await browser.newContext({ storageState: 'state.json' });
})

test('Place the order', async () => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card-body");
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if ((await products.nth(i).locator("b").textContent()).trim() === "ADIDAS ORIGINAL") {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div ul").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text='Checkout'").click();


    //selecting dynamic dropdown value
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropDown = await page.locator(".ta-results");
    await dropDown.waitFor();

    const optionCount = await dropDown.locator("button").count();
    for (let i = 0; i < optionCount; i++) {
        const countryName = await dropDown.locator("button").nth(i).textContent();
        if (countryName === " India") {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    //const expriyDate = await page.locator("div:has-text('Expiry Date ')");
    const monthValue = page.locator("select.input").first();
    await monthValue.selectOption("06");
    const dateValue = page.locator("select.input").last();
    await dateValue.selectOption("24");

    await page.locator("text='Place Order '").click();
    expect(await page.locator(".hero-primary")).toContainText(" Thankyou for the order. ");
})
