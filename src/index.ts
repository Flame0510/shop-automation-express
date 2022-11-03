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

let page: any;

let times = 0;

const size = "40";

const cardNumber = "4502144331007303";
const cardExp = "1223";
const cardCVV = "192";

const initialisePuppeteer = async () => {
  await chromeLauncher.killAll();

  /* const chrome = await chromeLauncher.launch({
    startingUrl: "https://www.zalando.it",
    //userDataDir: false,
    //chromeFlags: ["--headless", "--disable-gpu"],
  });

  const response = await axios.get(
    `http://localhost:${chrome.port}/json/version`
  );

  const { webSocketDebuggerUrl } = response.data; */

  const browser = await puppeteer.launch({
    //args: ["--no-sandbox"],
    //ignoreDefaultArgs: ["--enable-automation"],
    headless: false,
    product: "chrome",
    executablePath: executablePath(),
  });

  /* const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  }); */

  page = (await browser.pages())[0];

  /* const client = await page.target().createCDPSession();
  await client.send("Network.clearBrowserCookies");
  await client.send("Network.clearBrowserCache"); */

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
  );

  //setTimeout(async () => {
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

  randomEvent();

  /* await page.type('input[id="login.email"]', USERNAME);
    await page.type('input[id="login.secret"]', PASSWORD); */
  //}, 4000);
  //checkProduct();
};

const googleLogin = async () => {
  try {
    await page.goto(
      "https://accounts.google.com/ServiceLogin?hl=it&amp;passive=true&amp;continue=https://www.google.it/&amp;ec=GAZAmgQ"
    );
    await page.type('input[type="email"]', "micheletornello10@gmail.com");
    await page.keyboard.press("Enter");

    await page.waitForNavigation();

    setTimeout(async () => {
      //await page.waitForSelector('input[type="password"]');
      await page.type('input[type="password"]', "Mm5102001");

      await page.click('button[data-testid="login_button"]');

      await page.waitForNavigation();
      zalandoLogin();
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};

const randomEvent = async () => {
  await page.goto("https://www.zalando.it/uomo-home");

  await page.waitForSelector("article");
  await page.click("article a");

  setTimeout(() => {
    zalandoLogin();
  }, 4000);
};

const zalandoLogin = async () => {
  try {
    console.log("LOGIN");

    await page.goto("https://www.zalando.it/myaccount");

    const USERNAME = "micheletornello5@gmail.com";
    const PASSWORD = "zMm5102001";

    await page.waitForSelector('input[id="login.email"]');
    //await page.type('input[id="login.email"]', USERNAME);
    //await page.type('input[id="login.secret"]', PASSWORD);

    const typeTimeout =
      Array.from(USERNAME).length * 200 + Array.from(PASSWORD).length * 200;

    Array.from(USERNAME).map((letter, i) =>
      setTimeout(
        async () => await page.type('input[id="login.email"]', letter),
        i * 200
      )
    );

    Array.from(PASSWORD).map((letter, i) =>
      setTimeout(
        async () => await page.type('input[id="login.secret"]', letter),
        Array.from(USERNAME).length * 200 + i * 200
      )
    );

    setTimeout(async () => {
      await page.keyboard.press("Enter");
      console.log("LOGIN WAITING...");

      setTimeout(async () => {
        (await page.url().includes("https://www.zalando.it/myaccount"))
          ? checkProduct()
          : randomEvent();
      }, 4000);
    }, typeTimeout + 2000);
  } catch (error) {
    console.log(error);
  }
};

const checkProduct = async () => {
  try {
    await page.goto(
      "https://www.zalando.it/jordan-air-1-mid-se-sneakers-alte-blackinfraredwhitesail-joc12n023-q11.html"
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

      await page.waitForNavigation();

      buy();
    } else {
      console.log("NOT FOUND - Reload");
      checkProduct();
    }
  } catch (error) {
    console.log(error);

    //(error as string).includes("timeout") && (goToCart(), buy());
  }
};

const goToCart = async () => {
  try {
    await page.goto("https://www.zalando.it/cart/");
  } catch (error) {
    console.log(error);
  }
};

//CHECK PAYMENT ON CONFIRM
const checkPaymentOnConfirm = async () => {
  try {
    await page.$eval('div[class*="pay-token-confirmation', (div: HTMLElement) =>
      div.dataset.paymentMethodId === "CREDIT_CARD" &&
      div?.textContent?.includes(cardNumber.substring(cardNumber.length - 4))
        ? 'div[class*="pay-token-confirmation"] form button[type="submit"]' /* 'button[data-id*="confirmation-buyNow-bottom"]' */
        : 'div[class*="pay-token-confirmation"] form button[type="submit"]'
    );
  } catch (error) {
    console.log(error);
  }
};

//SELECT CREDIT CARD ON PAYMENT
const selectCreditCardOnPayment = async () => {
  try {
    //SELECT CREDIT CARD PAYMENT
    await page.click('input[aria-describedby="payment-method-info--cc"]');

    try {
      //TRY USE EXISTING CREDIT CARD
      await page.click('input[name="funding-source-payment-card"]');
    } catch {
      addNewCreditCard();
    }
  } catch (error) {
    console.log(error);
  }
};

//ADD NEW CREDIT CARD
const addNewCreditCard = async () => {
  try {
    await page.click('input[id="NEW_PAYMENT_CARD"]');

    await page.type('input[id="name-on-card-input-field"]', "Michele Tornello");
    await page.type('input[id="card-number-input-field"]', cardNumber);
    await page.type('input[id="exp-input-field"]', cardExp);
    await page.type('input[id="cvv-input-field"]', cardCVV);
  } catch (error) {
    console.log(error);
  }
};

const buy = async () => {
  try {
    if (await page.url().includes("/confirm")) {
      await page.click(checkPaymentOnConfirm());

      selectCreditCardOnPayment();

      //PROCEED BUTTON CLICK
      await page.click('button[class*="z-1-button"]');

      /* await page.goto("https://www.zalando.it/checkout/address");

      try {
        await page.click('a[class*="deliveryDestinationTab_option_HOME"]');
      } catch {}

      try {
        await page.waitForSelector('button[data-id*="proceedToPayment"]');
        await page.click('button[data-id*="proceedToPayment"]');
      } catch {} */
    }
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  initialisePuppeteer();
});
