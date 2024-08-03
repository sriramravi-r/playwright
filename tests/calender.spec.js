const {test}=require("@playwright/test")

test("calender validation",async({page})=>{
    const monthNumber="6"
    const date="15"
    const year="2027"
    const expectedList=[monthNumber,date,year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber).click()
    await page.locator(".react-calendar__month-view__days__day").nth(date).click()
    const inputs=await page.locator(".react-date-picker__inputGroup input")
    for(let index=0;index<inputs.length;i++){
        const values=inputs[index].getAttribute("values")
        expect(values).toEqual(expectedList[index])
    }

})