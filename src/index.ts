import { Page } from "puppeteer";

const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

let page : Page;

let times = 0;

let size = "44";

const initialisePuppeteer = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
  );

  //login();
  checkProduct();
};

const login = async () => {
  try {
    await page.goto(
      "https://accounts.zalando.com/authenticate?sales_channel=ebf57ebf-e26d-4ebd-8009-6ad519073d2a&request=eyJjbGllbnRfaWQiOiJmYXNoaW9uLXN0b3JlLXdlYiIsInJlc3BvbnNlX3R5cGUiOiJjb2RlIiwic2NvcGVzIjpbIm9wZW5pZCJdLCJyZWRpcmVjdF91cmkiOiJodHRwczovL3d3dy56YWxhbmRvLml0L3Nzby9jYWxsYmFjayIsInN0YXRlIjoiZXlKdmNtbG5hVzVoYkY5eVpYRjFaWE4wWDNWeWFTSTZJbWgwZEhCek9pOHZkM2QzTG5waGJHRnVaRzh1YVhRdmJYbGhZMk52ZFc1MEx5SXNJblJ6SWpvaU1qQXlNaTB4TUMwek1WUXlNam94TXpveE9Gb2lmUT09Iiwibm9uY2UiOiIwZWU4MWRkZC00ZTc0LTQ0OTktYTI2Ni1hNDcyMjYwYThhOGQiLCJ1aV9sb2NhbGVzIjpbIml0LUlUIl0sInJlcXVlc3RfaWQiOiJaYzZCbVZXUmQ2UUZPbEhHOjc1ZWU0ZmJmLWNhZGUtNDY4OC1iMmI4LWQyNDA4YzBkYzYzNTpGUXF0eEVXUC00TFdheTVWIiwiZiI6dHJ1ZX0=&ui_locales=it-IT&passwordMeterFT=true"
    );

    const USERNAME = "micheletornello5@gmail.com";
    const PASSWORD = "zMm5102001";

    await page.waitForSelector('input[id="login.email"]');
    await page.type('input[id="login.email"]', USERNAME);
    await page.type('input[id="login.secret"]', PASSWORD);

    await page.keyboard.press("Enter");

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
          //const size = times < 10 ? "44" : "40";
          return spans.find((span) => span.textContent === "44")
            ? option.textContent?.includes("Esaurito")
              ? "esaurito"
              : option.htmlFor
            : "non trovato";
        })
    );

    const cleanProducts = productsCheck.filter(
      (product: string) => product !== "esaurito" && product !== "non trovato"
    );

    if (cleanProducts.length) {
      await page.click(`label[for="${cleanProducts[0]}"]`);
      await page.click('div[data-testid="pdp-add-to-cart"] button');
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
