const {test, expect}=require("@playwright/test")
const { count } = require("console")

test("e2e test",async({browser})=>{
   const context = await browser.newContext()
   const page=await context.newPage()
   const loc_product_name=page.locator("div.card-body")
   const productname="qwerty12"
   await page.goto("https://rahulshettyacademy.com/client")
   await page.locator("#userEmail").fill("anshika@gmail.com")
   await page.locator("#userPassword").fill("Iamking@000")
   await page.locator("#login").click()
   await expect(page).toHaveTitle("Let's Shop")
   await page.waitForLoadState("networkidle")
   const productnames=await page.locator("div.card-body h5").allTextContents()
   const count_product=await loc_product_name.count()
   for(let i=0;i<count_product;++i){
    const name=await loc_product_name.nth(i).locator("h5").textContent()
    if(name === productname){
        await loc_product_name.nth(i).locator("text= Add To Cart").click()
        break
    }
   }
   await page.locator("[routerlink*='cart']").click()
   await page.waitForLoadState("domcontentloaded")
   await expect(page.locator("h3:has-text('qwerty12')")).toBeVisible()
   await page.locator("text=Checkout").click()
   await page.locator("div.form-group input").pressSequentially("ind")
   const options=page.locator(".ta-results")
   await options.waitFor()
   const countoption=await options.locator("button").count()
   for(let i=0;i<countoption;i++){
    if((await options.locator("button").nth(i).textContent()).trim() === "India"){
        await options.locator("button").nth(i).click()
        break;
    }
   }
   await page.locator("//div[contains(text(),'CVV')]/following-sibling::input").fill("322")
   await page.locator("//div[contains(text(),'Name on Card')]/following-sibling::input").fill("ram")
   await page.locator("//div[contains(text(),'Coupon')]/following-sibling::input").fill("rahulshetty")
   await page.locator("//button[contains(text(),'Coupon')]").click()
   await page.locator("//a[contains(text(),'Place Order ')]").click()
   await page.waitForLoadState("networkidle")
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
   const orderId=(await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).split(" ")[2]
   //await page.locator("[routerlink*='myorders']").click()
   await page.locator("//button[contains(@routerlink,'myorders')]").click()

//    const orderlist=await page.locator("tr.ng-star-inserted")
//    const countorderid=await page.locator("tr.ng-star-inserted").count()
//    for(let i=0;i<countorderid;i++){
//     if((orderlist.locator("th").nth(i).textContent()).trim() === orderId){
//         await orderlist.locator("button:has-text('view')").nth(i).click()
//         break;
//     }
//    }
   await page.locator("tbody").waitFor();
   const rows=await page.locator("tbody tr")
   console.log(rows)
   for(let i=0;i<await rows.count();i++){
     if((await rows.nth(i).locator("th").textContent()).trim() === orderId){
        await rows.nth(i).locator("button").first().click()
        break;
    }
   }
   
   console.log(await page.locator("p.tagline").textContent())
})