"use strict";
//import StealthPlugin from "puppeteer-extra-plugin-stealth";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
var puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
var axios_1 = __importDefault(require("axios"));
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
var chromeLauncher = require("chrome-launcher");
/* const Xvfb = require("xvfb");

const xvfb = new Xvfb();
xvfb.startSync(); */
var app = (0, express_1.default)();
var port = 3000;
var chromeConfig = {
    chromePath: "/usr/bin/google-chrome-stable",
};
var page;
var times = 0;
var size = "40";
var initialisePuppeteer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var chrome, response, webSocketDebuggerUrl, browser, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, chromeLauncher.killAll()];
            case 1:
                _a.sent();
                return [4 /*yield*/, chromeLauncher.launch({
                        startingUrl: "https://www.zalando.it",
                        //userDataDir: false,
                        //chromeFlags: ["--headless", "--disable-gpu"],
                    })];
            case 2:
                chrome = _a.sent();
                return [4 /*yield*/, axios_1.default.get("http://localhost:" + chrome.port + "/json/version")];
            case 3:
                response = _a.sent();
                webSocketDebuggerUrl = response.data.webSocketDebuggerUrl;
                return [4 /*yield*/, puppeteer_extra_1.default.connect({
                        browserWSEndpoint: webSocketDebuggerUrl,
                    })];
            case 4:
                browser = _a.sent();
                return [4 /*yield*/, browser.pages()];
            case 5:
                page = (_a.sent())[0];
                return [4 /*yield*/, page.target().createCDPSession()];
            case 6:
                client = _a.sent();
                return [4 /*yield*/, client.send("Network.clearBrowserCookies")];
            case 7:
                _a.sent();
                return [4 /*yield*/, client.send("Network.clearBrowserCache")];
            case 8:
                _a.sent();
                /*await page.setUserAgent(
                  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/60.0.3112.50 Safari/537.36"
                );*/
                //setTimeout(async () => {
                //googleLogin();
                /* await page.waitForSelector('a[title="Accedi"]');
                await page.click('a[title="Accedi"]');
                await page.goto("https://www.zalando.it");
                await page.waitForSelector('a[title="Accedi"]'); */
                return [4 /*yield*/, page.goto("https://www.zalando.it/test")];
            case 9:
                /*await page.setUserAgent(
                  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/60.0.3112.50 Safari/537.36"
                );*/
                //setTimeout(async () => {
                //googleLogin();
                /* await page.waitForSelector('a[title="Accedi"]');
                await page.click('a[title="Accedi"]');
                await page.goto("https://www.zalando.it");
                await page.waitForSelector('a[title="Accedi"]'); */
                _a.sent();
                return [4 /*yield*/, page.goto("https://www.zalando.it/jordan-air-1-mid-se-sneakers-alte-blackinfraredwhitesail-joc12n023-q11.html")];
            case 10:
                _a.sent();
                return [4 /*yield*/, page.goto("https://www.zalando.it")];
            case 11:
                _a.sent();
                setTimeout(function () {
                    zalandoLogin();
                }, 5000);
                return [2 /*return*/];
        }
    });
}); };
var googleLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, page.goto("https://accounts.google.com/ServiceLogin?hl=it&amp;passive=true&amp;continue=https://www.google.it/&amp;ec=GAZAmgQ")];
            case 1:
                _a.sent();
                return [4 /*yield*/, page.type('input[type="email"]', "micheletornello10@gmail.com")];
            case 2:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 4:
                _a.sent();
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            //await page.waitForSelector('input[type="password"]');
                            return [4 /*yield*/, page.type('input[type="password"]', "Mm5102001")];
                            case 1:
                                //await page.waitForSelector('input[type="password"]');
                                _a.sent();
                                return [4 /*yield*/, page.keyboard.press("Enter")];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, page.waitForNavigation()];
                            case 3:
                                _a.sent();
                                zalandoLogin();
                                return [2 /*return*/];
                        }
                    });
                }); }, 5000);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var zalandoLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var USERNAME_1, PASSWORD, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, page.goto("https://www.zalando.it/myaccount")];
            case 1:
                _a.sent();
                USERNAME_1 = "micheletornello5@gmail.com";
                PASSWORD = "zMm5102001";
                return [4 /*yield*/, page.waitForSelector('input[id="login.email"]')];
            case 2:
                _a.sent();
                //await page.type('input[id="login.email"]', USERNAME);
                //await page.type('input[id="login.secret"]', PASSWORD);
                Array.from(USERNAME_1).map(function (letter, i) {
                    return setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, page.type('input[id="login.email"]', letter)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }, i * 200);
                });
                Array.from(PASSWORD).map(function (letter, i) {
                    return setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, page.type('input[id="login.secret"]', letter)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }, Array.from(USERNAME_1).length * 200 + i * 200);
                });
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, page.keyboard.press("Enter")];
                            case 1:
                                _a.sent();
                                console.log("LOGIN WAITING...");
                                return [2 /*return*/];
                        }
                    });
                }); }, Array.from(USERNAME_1).length * 200 + Array.from(PASSWORD).length * 200 + 2000);
                return [4 /*yield*/, page.waitForNavigation()];
            case 3:
                _a.sent();
                checkProduct();
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var checkProduct = function () { return __awaiter(void 0, void 0, void 0, function () {
    var productsCheck, cleanProducts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                return [4 /*yield*/, page.goto("https://www.zalando.it/jordan-air-1-mid-se-sneakers-alte-blackinfraredwhitesail-joc12n023-q11.html")];
            case 1:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector("#picker-trigger")];
            case 2:
                _a.sent();
                return [4 /*yield*/, page.click("#picker-trigger")];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.waitForSelector('form[name="size-picker-form"]')];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.$$eval('form[name="size-picker-form"] label', function (options) {
                        return options.map(function (option) {
                            var spans = Array.from(option.querySelectorAll("span"));
                            spans[0].textContent = option.htmlFor;
                            return spans.map(function (span) { return span.textContent; });
                        });
                    })];
            case 5:
                productsCheck = _a.sent();
                cleanProducts = productsCheck
                    .filter(function (product) {
                    return product[1] === size && !product.find(function (p) { return p === "Esaurito"; });
                })
                    .flat();
                console.log("CLEAN PRODUCTS: ", cleanProducts);
                if (!cleanProducts.length) return [3 /*break*/, 9];
                return [4 /*yield*/, page.click("label[for=\"" + cleanProducts[0] + "\"]")];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.click('div[data-testid="pdp-add-to-cart"] button')];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                console.log("NOT FOUND - Reload");
                checkProduct();
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
app.listen(port, function () {
    initialisePuppeteer();
});
