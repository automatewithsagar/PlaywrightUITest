const {test,expect} = require('@playwright/test');

test('Sign in test',async ({browser})=>{
    const context = await browser.newContext(); //required only when need to pass specific config to browser like cookies, proxy etc
    const page = await context.newPage(); //this creates actual page for automation
    await page.goto("https://accstorefront.ce0szhuj4u-siegwerkd1-s1-public.model-t.cc.commerce.ondemand.com/en");
    
    
    //get title-put assertion to verify: 

    await expect(page).toHaveTitle("my.Siegwerk Staging: Sign In"); //expect is another fixture in playwright

    //Sign in: 
    await page.locator('input#j_username').fill("adminuser0002210479@email.com");
    await page.locator("input#j_password").fill("mySW180125");
    await page.locator("[type='submit']").click();

    //check the error message for incorrect signin: 
    console.log(await page.locator(".fn-message-strip__text").textContent());

    //asserting the text: 
    await expect(page.locator(".fn-message-strip__text")).toContainText("we could not authenticate you");
});


//when we don't need any information to pass to browser then no need to write newContext() and newPage()
//playwright does it automatically for us by providing fixture called {page}

test('Page Playwright test',async ({page})=>{
    await page.goto("https://google.co.in");
});



//running only below test case using test.only()

test("RahulAcademy Sign in",async ({browser, page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("[name='signin']");

    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await signIn.click();

    console.log(await page.locator(".card-body a").nth(0).textContent()); //getting value of first locator out of multiples
    
    //or can use .first() method also for getting first locator value
    console.log(await page.locator(".card-body a").first().textContent());

    
    //but if we want mulitple elements values/texts then we used allTextContents() and for this
    //auto wait mechanism will not work. we have to explicitly put wait for using this method: 

    await page.locator(".card-body a").first().waitFor(); //we have used waitFor() method for dynamic explicit wait
    const titles = await page.locator(".card-body a").allTextContents();
    console.log(titles);

    
     
});

test("UI Controls",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("[name='signin']");

    await username.fill("rahulshettyacademy");
    await password.fill("learning");

    const dropDown = page.locator("select.form-control");

    //selecting option from static drop down:
    await dropDown.selectOption("Consultant");

    //seleting radio button: 
    await page.locator(".radiotextsty").nth(1).click();

    await page.locator("#okayBtn").click();

    console.log(await page.locator(".radiotextsty").nth(1).isChecked()); //use to print true or false if any radion/checkbox button is checked or not

    //assertion to vefify that radiobutton is selected or not: 
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();

    //clicking on checkbox: 
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    //to uncheck the checked box:
    await page.locator("#terms").uncheck();
    await expect(await page.locator("#terms").isChecked()).toBeFalsy(); //check if the inner statement is returning false

    //check wether blinking text is there or not: 
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
 
    await signIn.click();
})



 //Handling child windows & tabs: 

 test('Child Window handle',async ({browser})=>{ //using context as we need to switch the windows with same credentials
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    

    const [newPage] = await Promise.all([ //storing new page in an array, if there are move pages then we can store them in an array using comma separated
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    const text = await newPage.locator(".red").nth(0).textContent();
    console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    //moving to orignal page
    
    await page.locator("#username").fill(domain);
    //await page.pause();


 })