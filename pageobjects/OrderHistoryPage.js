const { expect } = require('@playwright/test');
class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.thankyou = page.locator(".hero-primary");
        this.orderno = page.locator(".em-spacer-1 .ng-star-inserted");
        this.historyPage = page.locator("[routerlink*=myorders]").first();
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text").first();
    }
    async getOrderId() {
        expect(await this.thankyou).toContainText(" Thankyou for the order. ");
        const orderId = await this.orderno.textContent();
        return await orderId;
    }
    async gotoOrderHistory() {
        await this.historyPage.click();
    }
    async searchOrderandSelect(orderId) {
        await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
        //this.orderIdDetails.first().textContent();
        //expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
    async getOrderIdDetails() {
        //console.log("got orderid= " +await this.orderIdDetails.textContent());
        return await this.orderIdDetails.textContent();
    }

}
module.exports = { OrderHistoryPage };