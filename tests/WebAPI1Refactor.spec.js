const {test,expect,request} = require("@playwright/test");
const {APIUtils} = require("./utils/APIUtils");
const loginPayload = {userEmail: "dahiyasagar90@gmail.com",userPassword: "Physics.123"};
const orderPayload = {orders: [{country: "Argentina", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};

let response;
test.beforeAll(async ()=>{
    const apiContext = await request.newContext({ignoreHTTPSErrors: true});
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test('Place the order',async ({page})=>{
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
    
        const rows = page.locator("tbody tr");
        for(let i=0;i<await rows.count();i++){
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if(response.orderId.includes(rowOrderId)){
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    const orderIDDetails = await page.locator(".col-text").first().textContent();
    expect(response.orderId.includes(orderIDDetails)).toBeTruthy();
})