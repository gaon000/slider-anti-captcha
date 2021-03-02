const puppeteer = require('puppeteer')

async function run() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1024, height: 768 }
    })
    await browser.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36")

    const page = await browser.newPage()

    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false
        })
    })

    await page.goto('https://world.taobao.com/markets/all/sea/register')
    await page.setViewport({ width: 1024, height: 768 });
    let frame = page.frames()[1]
    await frame.waitForSelector('.nc_iconfont.btn_slide')
    const sliderElement = await frame.$('.slidetounlock')
    const slider = await sliderElement.boundingBox()

    const sliderHandle = await frame.$('.nc_iconfont.btn_slide')
    const handle = await sliderHandle.boundingBox()


    
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2)
    await page.waitFor(3000)

    await page.mouse.down()
    const slider_x = handle.x + slider.width
    const slider_y = handle.y + handle.height / 2
    for (var i = 1; i <= 10; i++) {
        await page.mouse.move(handle.x + handle.width / 2 + (slider_x - (handle.x + handle.width / 2)) / 10 * i,handle.y + handle.height / 2, { steps: 50 });
        await page.waitFor(50);
       }
    // await page.mouse.move(handle.x + slider.width, handle.y + handle.height / 2, { steps: 50 })
    // await page.waitFor(3000)

    await page.mouse.up()

    await page.waitFor(3000)
    await page.screenshot(
        {
            path: './zzz.jpeg',
            fullPage: true
        }
    )

    // success!

    await browser.close()
}

run()
