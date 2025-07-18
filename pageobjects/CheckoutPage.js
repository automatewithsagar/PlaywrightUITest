class CheckoutPage{
    constructor(page){
        this.page = page;
        this.country = page.locator("[placeholder='Select Country']");
        this.countryOptions = page.locator(".ta-results");

        this.monthValue = page.locator("select.input").first();
        this.dateValue = page.locator("select.input").last();

        this.placeorder = page.locator("text='Place Order '");

    }
    async selectCountry(countryCode,country){
        await this.country.pressSequentially(countryCode);
        await this.countryOptions.waitFor();
        const optionCount = await this.countryOptions.locator("button").count();
        for(let i=0;i<optionCount;i++){
            const countryName = await this.countryOptions.locator("button").nth(i).textContent();
            if(countryName===country){
                await this.countryOptions.locator("button").nth(i).click();
                break;
            }
        }
    }
    async selectCreditCardExpirtyDate(date,month){
        await this.monthValue.first();
        await this.monthValue.selectOption(date);
        await this.dateValue.last();
        await this.dateValue.selectOption(month);
    }
    async placeOrder(){
        await this.placeorder.click();
    }
}
module.exports={CheckoutPage};