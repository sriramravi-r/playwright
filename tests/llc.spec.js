const {test} = require("@playwright/test")

test("playwright special locators",async ({browser})=>{
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").isChecked()
    await page.getByLabel("Employed").click()
    await page.getByLabel("Gender").selectOption("Male")
    await page.getByPlaceholder("Password").fill("admin")
    await page.getByRole("button",{name:"Submit"}).click()
    await page.getByRole("link",{name:"Shop"}).click()
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole("button").click()
    // await page.getByRole("link",{name : "Shop"}).click();
    // await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
})  