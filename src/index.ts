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

let size = "40";

const initialisePuppeteer = async () => {
  await chromeLauncher.killAll();

  const chrome = await chromeLauncher.launch({
    startingUrl: "https://www.zalando.it",
    //userDataDir: false,
    //chromeFlags: ["--headless", "--disable-gpu"],
  });

  const response = await axios.get(
    `http://localhost:${chrome.port}/json/version`
  );

  const { webSocketDebuggerUrl } = response.data;

  /* const browser = await puppeteer.launch({
    // args: ["--no-sandbox"],
    // ignoreDefaultArgs: ["--enable-automation"],
    headless: false,
    channel: "chrome",
    executablePath: executablePath(),
  }); */

  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });

  page = (await browser.pages())[0];

  const client = await page.target().createCDPSession();
  await client.send("Network.clearBrowserCookies");
  await client.send("Network.clearBrowserCache");

  /*await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/60.0.3112.50 Safari/537.36"
  );*/

  //setTimeout(async () => {
  //googleLogin();
  /* await page.waitForSelector('a[title="Accedi"]');
  await page.click('a[title="Accedi"]');
  await page.goto("https://www.zalando.it");
  await page.waitForSelector('a[title="Accedi"]'); */

  await page.goto("https://www.zalando.it/test");
  await page.goto(
    "https://www.zalando.it/jordan-air-1-mid-se-sneakers-alte-blackinfraredwhitesail-joc12n023-q11.html"
  );
  await page.goto("https://www.zalando.it");

  setTimeout(() => {
    zalandoLogin();
  }, 5000);

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
      await page.keyboard.press("Enter");

      await page.waitForNavigation();
      zalandoLogin();
    }, 5000);
  } catch (error) {
    console.log(error);
  }
};

const zalandoLogin = async () => {
  try {
    await page.goto("https://www.zalando.it/myaccount");

    const USERNAME = "micheletornello5@gmail.com";
    const PASSWORD = "zMm5102001";

    await page.waitForSelector('input[id="login.email"]');
    //await page.type('input[id="login.email"]', USERNAME);
    //await page.type('input[id="login.secret"]', PASSWORD);

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
    }, Array.from(USERNAME).length * 200 + Array.from(PASSWORD).length * 200 + 2000);

    await page.waitForNavigation();

    checkProduct();
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
      await page.click(`label[for="${cleanProducts[0]}"]`);
      await page.click('div[data-testid="pdp-add-to-cart"] button');

      await page.waitForNavigation();

      //login();
    } else {
      console.log("NOT FOUND - Reload");
      checkProduct();
    }
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  initialisePuppeteer();
});
