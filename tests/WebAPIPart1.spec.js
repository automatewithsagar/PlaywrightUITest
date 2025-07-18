const{test,expect,request} = require("@playwright/test");

const loginPayload = {userEmail: "dahiyasagar90@gmail.com",userPassword: "Physics.123"};
const orderPayload = {orders: [{country: "Argentina", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
let token;
let orderId;

test.beforeAll(async()=>{
    const apiContext = await request.newContext({ignoreHTTPSErrors: true});
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data:loginPayload,
    }); //geting response as an object here and we can do multiple things using that object

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json(); //storing response as json
    token = loginResponseJson.token; //fetching token from response
    //const userId = loginResponseJson.userId; //fetching token from response
    console.log(token);
    //console.log(userId);


    //Place order through API: 
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data: orderPayload,
        headers:{
            'Authorization':token,
            'Content-Type' :'application/json'
        },
    });
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];


})


test("Search order in Order History",async ({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");
    for(let i=0;i<await rows.count();i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIDDetails = await page.locator(".col-text").first().textContent();
    expect(orderId.includes(orderIDDetails)).toBeTruthy();
});
