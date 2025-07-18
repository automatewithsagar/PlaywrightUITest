const {expect} = require('@playwright/test');
class CartPage{
    constructor(page){
        this.page = page;
        this.cartProduct  = page.locator("div ul").first();
        this.checkout = page.locator("text='Checkout'");
    }
    async verifyProductIsDisplayed(productName){
        await this.cartProduct.waitFor();
        const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible();
        expect(bool).toBeTruthy();
    }
    async checkOut(){
        await this.checkout.click();
    }
}
module.exports={CartPage};