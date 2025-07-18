const {test,expect} = require("@playwright/test");

test('Client app login', async ({page})=>{
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("dahiyasagar90@gmail.com");
    await page.locator("#userPassword").fill("Physics.123");
    await page.locator("[value='Login']").click();
    await products.first().waitFor();
    //await page.waitForLoadState('networkidle'); //we can use instead of above wait for but now this method has been discouraged my playwright
    
    const count = await products.count();
    for(let i=0;i<count;++i){
        if((await products.nth(i).locator("b").textContent()).trim() === "ADIDAS ORIGINAL"){
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
    const dropDown= await page.locator(".ta-results");
    await dropDown.waitFor();

    const optionCount = await dropDown.locator("button").count();
    for(let i=0;i<optionCount;i++){
        const countryName = await dropDown.locator("button").nth(i).textContent();
        if(countryName===" India"){
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
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("[routerlink*=myorders]").first().click();
    await page.locator("tbody").waitFor();


    //fetching details from table and then clicking on particular item view button
    const rows = await page.locator("tbody tr");
    for(let i=0;i<await rows.count();i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").first().textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

})