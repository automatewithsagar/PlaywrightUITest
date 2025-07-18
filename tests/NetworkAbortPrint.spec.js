const{test,expect,request} = require('@playwright/test');

test("Security test request intercept",async({page})=>{

    await page.route('**/*.css',route=>route.abort()); //aborting all css calls
    await page.route('**/*.{png,jpg,jpeg}',route=>route.abort()); //aborting all image calls

    await page.goto("https://rahulshettyacademy.com/client");
    
    await page.locator("#userEmail").fill("dahiyasagar90@gmail.com");
    await page.locator("#userPassword").fill("Physics.123");
    await page.locator("[value='Login']").click();

    await page.on('request',request=>console.log(request.url())); // printing all request calls 
    await page.on('response',response=>console.log(response.url(),response.status())); //printing all response calls and their status

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
 

})