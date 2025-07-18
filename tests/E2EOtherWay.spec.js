const {test,expect}=require("@playwright/test");

test("@Webst Client App login",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("dahiyasagar90@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Physics.123");
    await page.getByRole('button',{name:"Login"}).click();

    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText: "IPHONE 13 PRO"})
    .getByRole("button",{name:" Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();

    await page.getByRole("button",{name:"Checkout"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("Place Order ").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


});