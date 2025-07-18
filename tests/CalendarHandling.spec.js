const {test,expect} = require("@playwright/test");

test("Calendar validations",async ({page})=>{
    const month = '6';
    const date = '15';
    const year = '2027';
    const expectedlist=[month,date,year];

    page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText ").click();
    await page.locator(".react-calendar__navigation__label__labelText ").click();

    await page.getByText(year).click(); //selecting year
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month-1)).click(); //selecting month
    await page.locator("//abbr[text()='"+date+"']").click(); //we have used xpath here to select the date

    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for(let i=0;i<inputs.length;i++){
        const value = await inputs[i].getAttribut("value");
        expect(value).toEqual(expectedlist[i]);
    }
})