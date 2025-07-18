const{test,expect,request} = require('@playwright/test');

test("Security test request intercept",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("dahiyasagar90@gmail.com");
    await page.locator("#userPassword").fill("Physics.123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67daad72c019fb1ad62e6499"})
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause();
})