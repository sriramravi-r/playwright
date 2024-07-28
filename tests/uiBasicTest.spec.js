const {test, expect}=require('@playwright/test')
// test("first playwright test", async ({browser})=>{
//     // below two lines will handle by "page fixture"
//     const contextBrowser=await browser.contexts()
//     const page=await contextBrowser.newPage()
//     await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/")
// });

test.only("second playwright test", async ({page})=>{
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