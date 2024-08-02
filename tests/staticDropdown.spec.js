const {test, expect}=require("@playwright/test")

test("static dropdown",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await expect(page.locator(".blinkingText")).toHaveAttribute("class","blinkingText")
    const dropdown=page.locator("select.form-control")
    await dropdown.selectOption("Teacher")
    //await page.pause(); // it will stop the execution open the playwright inspector
    await page.locator("span.radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    console.log(await page.locator("span.radiotextsty").last().isChecked())
    expect(page.locator("span.radiotextsty").last()).toBeChecked()
    //await page.pause()
    await page.locator("#terms").isChecked()
    await page.locator("#terms").click()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    //await page.pause()
})

test.only("child windows handling",async({browser})=>{
    const context=await browser.newContext()
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentlinks=page.locator("[href*='documents-request']")
    const [newPage]=await Promise.all([
        context.waitForEvent("page"), // listen when a new page is opening 
        // wait for promises: three type of promisis -pending,rejected,fullfiled
        documentlinks.click(),
    ])
    
    const email=await newPage.locator('[href*="mailto"]').textContent()
    const domain=email.split('@')[0]
    await page.locator("#username").fill(domain)
    await page.pause()
})