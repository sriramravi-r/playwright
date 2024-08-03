const {test,expect}=require("@playwright/test")

test("more validation",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/ ")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    await page.pause()
    page.on("dialog",dialog=>dialog.accept())
    //page.on("dialog",dialog=>dialog.dismiss())
    await page.locator("#alertbtn").click()
    const framePage=page.frameLocator("courses-iframe")
    await framePage.locator("li a[href*='lifetime-access]").nth(1).click()
})