const {test,expect,request} = require("@playwright/test");
const {APIUtils} = require("./utils/APIUtils");
const loginPayload = {userEmail: "dahiyasagar90@gmail.com",userPassword: "Physics.123"};
const orderPayload = {orders: [{country: "Argentina", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
const fakePayloadOrders ={data:[],message:"No Orders"}; 
let response;
test.beforeAll(async ()=>{
    const apiContext = await request.newContext({ignoreHTTPSErrors: true});
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test('Place the order',async ({page,context})=>{
    
    await context.grantPermissions([], {
        ignoreHTTPSErrors: true //To ignore SSL errors
    });

    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67cedd73c019fb1ad61f023c",
        async route=>{
            //intercepting response- API response ->{fake response playwright}->browser-> render data on front end
            const response = await page.request.fetch(route.request());
            let body =JSON.stringify(fakePayloadOrders) ;
            route.fulfill({
                response,
                body,
            })
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67cedd73c019fb1ad61f023c");
    console.log(await page.locator(".mt-4").textContent());
})