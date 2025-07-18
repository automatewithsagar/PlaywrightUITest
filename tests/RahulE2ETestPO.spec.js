const { test, expect } = require("@playwright/test");
const{POManager} = require('../pageobjects/POManager');


//importing data from json file and for that we should do: Json->String(JSON.stringify)-> JS object(JSON.parse)
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

test.describe.configure({mode:'parallel'});
for(const data of dataset){
    test(`Client app login for ${data.productName}`, async ({ page }) => {
        
        const countryCode = "ind";
        const country = " India";
    
        const poManager = new POManager(page);
    
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage();
        const orderHistoryPage = poManager.getOrderHistoryPage();
    
        await loginPage.goTo();
        await loginPage.validLogin(data.username,data.password);
    
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCart();
    
        await cartPage.verifyProductIsDisplayed(data.productName);
        await cartPage.checkOut();
    
        await checkoutPage.selectCountry(countryCode, country);
        await checkoutPage.selectCreditCardExpirtyDate("06", "24");
        await checkoutPage.placeOrder();
    
        const orderId = await orderHistoryPage.getOrderId();
        await orderHistoryPage.gotoOrderHistory();
        await orderHistoryPage.searchOrderandSelect(orderId);
    
        //expect(orderId.trim().includes(orderHistoryPage.getOrderIdDetails())).toBeTruthy();
    
    })
}
