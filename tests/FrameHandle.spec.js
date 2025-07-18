const{test,expect} = require("@playwright/test");

test("Handle Frames and hidden element",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    //await page.goto("https://google.co.in");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //to accept or reject java based popups/dialogue
    page.on('dialog',dialog=>dialog.accept()); //to accept ->playwright will search and anywhere in page then it would accept
    // page.on('dialog',dialog=>dialog.dismiss()); //to reject

    await page.locator("#alertbtn").click();

    //MouseHover: 
    await page.locator("#mousehover").hover();


    //Handling Frames: 
    const framePage =  page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click(); //click on only visible element
    const text= await framePage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

})