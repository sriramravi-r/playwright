const {test, expect}=require('@playwright/test')
test("first playwright test", async ({browser})=>{
    // below two lines will handle by "page fixture"
    const contextBrowser=await browser.contexts()
    const page=await contextBrowser.newPage()
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/")
});

test("second playwright test", async ({page})=>{
    // below two lines will handle by "page fixture"
    // const contextBrowser=browser.contexts()
    // const page=await contextBrowser.newPage()
    await page.goto("https://google.com")
    //get title assert it
    //console.log(await page.title())
    const pagetitle=await page.title()
    await expect(page).toHaveTitle("Google")
    // locators
    // css, //xpath
    await page.locator("input#username")
});

test.only("third playwright test",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.locator("#username").fill("rahulshetty")
    await page.locator("[id='password']").fill("learning")
    await page.locator("#signInBtn").click()
    //webdriverwait for error machnisms
    const message=await page.locator("[name='loginForm'] .alert").textContent()
    await expect(message).toContain("Incorrect")
    await page.locator("#username").fill("")
    await page.locator("#username").fill("rahulshettyacademy")
    await page.locator("#signInBtn").click()
    console.log(await page.title())
    console.log(await page.locator('.card .card-body h4 a').first().textContent())
    // or
    console.log(await page.locator('.card .card-body h4 a').nth(1).textContent())
    // grap all titles
    const alltitle=await page.locator('.card .card-body h4 a').allTextContents()
    console.log(alltitle)
})  