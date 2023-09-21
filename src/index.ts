//import StealthPlugin from "puppeteer-extra-plugin-stealth";

import express from "express";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
//import chromeLauncher from "chrome-launcher";
import { executablePath } from "puppeteer";
import axios from "axios";

puppeteer.use(StealthPlugin());

const chromeLauncher = require("chrome-launcher");
/* const Xvfb = require("xvfb");

const xvfb = new Xvfb();
xvfb.startSync(); */

const app = express();
const port = 3000;

const chromeConfig = {
  chromePath: "/usr/bin/google-chrome-stable",
};

let times = 0;

const size = "41";

const cardNumber = "4502144331007303";
const cardExp = "1223";
const cardCVV = "192";

app.get("/", (req, res) => {
  initialisePuppeteer();
});

const initialisePuppeteer = async () => {
  try {
    //await chromeLauncher.killAll();

    /*const chrome = await chromeLauncher.launch({
      startingUrl: "https://www.zalando.it",
      //userDataDir: false,
      //chromeFlags: ["--headless", "--disable-gpu"],
    });

    const response = await axios.get(
      `http://localhost:${chrome.port}/json/version`
    );

    const { webSocketDebuggerUrl } = response.data;*/

    const browser = await puppeteer.launch({
      //ignoreDefaultArgs: ["--enable-automation"],
      //args: ["--disable-blink-features=AutomationControlled"],
      args: [
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
      ],
      headless: false,
      product: "chrome",
      executablePath: executablePath(),
    });

    //const page = browser.newPage();

    /* const browser = await puppeteer.connect({
      browserWSEndpoint: webSocketDebuggerUrl,
    }); */

    const page = (await browser.pages())[0];

    //screenshotView();

    /* await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  }); */

    /* const client = await page.target().createCDPSession();
  await client.send("Network.clearBrowserCookies");
  await client.send("Network.clearBrowserCache"); */

    /*  await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
      //"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    ); */

    //await page.goto("https://arh.antoinevastel.com/bots/areyouheadless");

    console.log(await browser.userAgent());

    //setTimeout(async (page:any) => {
    //googleLogin();
    /* await page.waitForSelector('a[title="Accedi"]');
  await page.click('a[title="Accedi"]');
  await page.goto("https://www.zalando.it");
  await page.waitForSelector('a[title="Accedi"]'); */

    /* await page.goto("https://www.zalando.it/" + new Date().getTime());
  await page.goto(
    "https://www.zalando.it/jordan-air-1-mid-se-sneakers-alte-blackinfraredwhitesail-joc12n023-q11.html"
  );
  await page.goto("https://www.zalando.it");
  await page.waitForSelector("article"); */
    //await page.click("article a");

    randomEvent(page);
    screenshotView(page);
  } catch (error) {
    console.log(error);
  }

  /* await page.type('input[id="login.email"]', USERNAME);
    await page.type('input[id="login.secret"]', PASSWORD); */
  //}, 4000);
  //checkProduct();
};

const screenshotView = (page: any) => {
  let screenshotInterval;

  clearInterval(screenshotInterval);

  screenshotInterval = setInterval(async () => {
    try {
      await page.screenshot({ path: "./screen.jpg" });
    } catch (error) {
      console.log(error);
      screenshotView(page);
    }
  }, 500);
};

const googleLogin = async (page: any) => {
  try {
    await page.goto(
      "https://accounts.google.com/ServiceLogin?hl=it&amp;passive=true&amp;continue=https://www.google.it/&amp;ec=GAZAmgQ"
    );
    await page.type('input[type="email"]', "micheletornello10@gmail.com");
    await page.keyboard.press("Enter");

    await page.waitForNavigation();

    setTimeout(async (page: any) => {
      //await page.waitForSelector('input[type="password"]');
      await page.type('input[type="password"]', "Mm5102001");

      await page.click('button[data-testid="login_button"]');

      await page.waitForNavigation();
      zalandoLogin(page);
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};

const randomEvent = async (page: any) => {
  try {
    console.log("RANDOM EVENT");

    await page.goto(
      `https://www.zalando.it/${Math.random() > 0.5 ? "uomo" : "donna"}-home`
    );

    let clickSelector = "li";

    const randomArray = Array.from(Array(Math.floor(Math.random() * 5)));

    console.log(randomArray);

    clickSelector = randomArray.reduce(
      (acc, _) => acc.concat(" ~ li"),
      clickSelector
    );

    clickSelector = clickSelector.concat(" article a");

    console.log(clickSelector);

    await page.waitForSelector("article");
    await page.click(`${clickSelector}`);

    setTimeout(() => {
      zalandoLogin(page);
    }, 4000);
  } catch (error) {
    console.log(error);

    randomEvent(page);
  }
};

const zalandoLogin = async (page: any) => {
  try {
    console.log("LOGIN");

    await page.goto("https://www.zalando.it/myaccount");

    const USERNAME = "micheletornello5@gmail.com";
    const PASSWORD = "zMm5102001";

    await page.waitForSelector('input[id="login.email"]');
    //await page.type('input[id="login.email"]', USERNAME);
    //await page.type('input[id="login.secret"]', PASSWORD);

    const typeTimeout =
      Array.from(USERNAME).length * 100 + Array.from(PASSWORD).length * 100;

    Array.from(USERNAME).map((letter, i) =>
      setTimeout(
        async () => await page.type('input[id="login.email"]', letter),
        i * 100
      )
    );

    Array.from(PASSWORD).map((letter, i) =>
      setTimeout(
        async () => await page.type('input[id="login.secret"]', letter),
        Array.from(USERNAME).length * 100 + i * 100
      )
    );

    setTimeout(async () => {
      await page.keyboard.press("Enter");
      console.log("LOGIN WAITING...");

      setTimeout(async () => {
        (await page.url().includes("https://www.zalando.it/myaccount"))
          ? checkProduct(page)
          : randomEvent(page);
      }, 8000);
    }, typeTimeout + 2000);
  } catch (error) {
    console.log(error);
  }
};

const checkProduct = async (page: any) => {
  try {
    console.log("CHECK PRODUCT");

    await page.goto(
      "https://www.zalando.it/jordan-air-jordan-1-zoom-air-comfort-sneakers-alte-white-onyxcardinal-redblacklight-currywhite-joc12n01f-h11.html"
    );

    await page.waitForSelector("#picker-trigger");
    await page.click("#picker-trigger");

    await page.waitForSelector('form[name="size-picker-form"]');

    const productsCheck = await page.$$eval(
      'form[name="size-picker-form"] label',
      (options: any) =>
        options.map((option: HTMLLabelElement) => {
          const spans = Array.from(option.querySelectorAll("span"));
          spans[0].textContent = option.htmlFor;

          return spans.map((span) => span.textContent);
        })
    );

    //console.log(productsCheck);

    const cleanProducts = productsCheck
      .filter(
        (product: string[]) =>
          product[1] === size && !product.find((p) => p === "Esaurito")
      )
      .flat();

    console.log("CLEAN PRODUCTS: ", cleanProducts);

    if (cleanProducts.length) {
      const buyButtonValue = await page.$eval(
        'div[data-testid="pdp-add-to-cart"] button span',
        (span: HTMLSpanElement) => span.textContent
      );

      console.warn("BUY BUTTON VALUE: ", buyButtonValue);

      await page.click(`label[for="${cleanProducts[0]}"]`);
      await page.click('div[data-testid="pdp-add-to-cart"] button');

      buyButtonValue === "Aggiungi al carrello" &&
        (await page.goto("https://www.zalando.it/cart/"));

      await page.waitForSelector('button[class*="__button-checkout"]');
      await page.click('button[class*="__button-checkout"]');

      buy(page);
    } else {
      console.log("NOT FOUND - Reload");
      checkProduct(page);
    }
  } catch (error) {
    checkProduct(page);
    console.log(error);

    //(error as string).includes("timeout") && (goToCart(), buy());
  }
};

const goToCart = async (page: any) => {
  try {
    await page.goto("https://www.zalando.it/cart/");
  } catch (error) {
    console.log(error);
  }
};

//CHECK PAYMENT ON CONFIRM
const checkPaymentOnConfirm = async (page: any) => {
  try {
    if (await page.url().includes("something-went-wrong")) {
      checkProduct(page);
    } else {
      await page.waitForSelector('div[class*="pay-token-confirmation');
      const result = await page.$eval(
        'div[class*="pay-token-confirmation',
        ({ dataset: { paymentMethodId }, textContent }: HTMLElement) => ({
          paymentMethodId,
          textContent,
        })
      );

      console.log(result);

      const { paymentMethodId, textContent } = result;

      const cardNumberLast4 = cardNumber.substring(cardNumber.length - 4);

      await page.click(
        paymentMethodId === "CREDIT_CARD" &&
          textContent.includes(cardNumberLast4)
          ? 'div[class*="pay-token-confirmation"] form button[type="submit"]' // 'button[data-id*="confirmation-buyNow-bottom"]'
          : 'div[class*="pay-token-confirmation"] form button[type="submit"]'
      );

      selectCreditCardOnPayment(page);
    }
  } catch (error) {
    buy(page);
    console.log("checkPaymentOnConfirm ERROR: ", error);
  }
};

//SELECT CREDIT CARD ON PAYMENT
const selectCreditCardOnPayment = async (page: any) => {
  try {
    //SELECT CREDIT CARD PAYMENT
    console.log("SELECT CREDIT CARD PAYMENT");

    await page.waitForSelector('label[for="cc"]');
    await page.click('label[for="cc"]');

    try {
      //TRY USE EXISTING CREDIT CARD
      console.log("TRY USE EXISTING CREDIT CARD");

      await page.waitForSelector(
        'input[name="funding-source-payment-card"] ~ div label'
      );
      await page.click('input[name="funding-source-payment-card"] ~ div label');

      await page.click('button[class*="z-1-button"]');

      checkPaymentOnConfirm(page);
    } catch {
      addNewCreditCard(page);
    }
  } catch (error) {
    checkPaymentOnConfirm(page);
    console.log("selectCreditCardOnPayment ERROR: ", error);
  }
};

//ADD NEW CREDIT CARD
const addNewCreditCard = async (page: any) => {
  try {
    await page.click('input[id="NEW_PAYMENT_CARD"]');

    await page.type('input[id="name-on-card-input-field"]', "Michele Tornello");
    await page.type('input[id="card-number-input-field"]', cardNumber);
    await page.type('input[id="exp-input-field"]', cardExp);
    await page.type('input[id="cvv-input-field"]', cardCVV);
  } catch (error) {
    console.log("addNewCreditCard ERROR: ", error);
  }
};

const buy = async (page: any) => {
  try {
    console.log("BUY FUNCTION");

    if (await page.url().includes("/confirm")) {
      console.log("CONFIRM PAGE");

      checkPaymentOnConfirm(page);

      //PROCEED BUTTON CLICK
      //await page.click('button[class*="z-1-button"]');

      // await page.goto("https://www.zalando.it/checkout/address");
    } else if (await page.url().includes("/payment")) {
      console.log("PAYMENT");

      selectCreditCardOnPayment(page);
    } else if (await page.url().includes("/address")) {
      console.log("ADDRESS");

      try {
        await page.waitForSelector(
          'a[class*="deliveryDestinationTab_option_HOME"]'
        );
        await page.click('a[class*="deliveryDestinationTab_option_HOME"]');

        await page.waitForSelector('button[data-id*="proceedToPayment"]');
        await page.click('button[data-id*="proceedToPayment"]');

        buy(page);
      } catch (error) {
        console.log("ADDRESS ERROR", error);

        await page.waitForSelector('button[data-id*="proceedToPayment"]');
        await page.click('button[data-id*="proceedToPayment"]');

        buy(page);
      }
    } else {
      setTimeout(() => {
        buy(page);
      }, 1000);
    }
  } catch (error) {
    buy(page);
    console.log("BUY ERROR: ", error);
  }
};

app.listen(port, () => {
  initialisePuppeteer();
});
