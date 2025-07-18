const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { OrderHistoryPage } = require('../pageobjects/OrderHistoryPage');
const { ContactPage } = require('../pageobjects/ContactPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
        this.contactPage = new ContactPage(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
    getContactPage() {
        return this.contactPage;
    }

}
module.exports = { POManager };