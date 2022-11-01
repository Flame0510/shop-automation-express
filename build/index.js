"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var puppeteer = require("puppeteer");
var app = express();
var port = 3000;
var page;
var times = 0;
var size = "44";
var initialisePuppeteer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({
                    headless: false,
                })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36")];
            case 3:
                _a.sent();
                //login();
                checkProduct();
                return [2 /*return*/];
        }
    });
}); };
var login = function () { return __awaiter(void 0, void 0, void 0, function () {
    var USERNAME, PASSWORD, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, page.goto("https://accounts.zalando.com/authenticate?sales_channel=ebf57ebf-e26d-4ebd-8009-6ad519073d2a&request=eyJjbGllbnRfaWQiOiJmYXNoaW9uLXN0b3JlLXdlYiIsInJlc3BvbnNlX3R5cGUiOiJjb2RlIiwic2NvcGVzIjpbIm9wZW5pZCJdLCJyZWRpcmVjdF91cmkiOiJodHRwczovL3d3dy56YWxhbmRvLml0L3Nzby9jYWxsYmFjayIsInN0YXRlIjoiZXlKdmNtbG5hVzVoYkY5eVpYRjFaWE4wWDNWeWFTSTZJbWgwZEhCek9pOHZkM2QzTG5waGJHRnVaRzh1YVhRdmJYbGhZMk52ZFc1MEx5SXNJblJ6SWpvaU1qQXlNaTB4TUMwek1WUXlNam94TXpveE9Gb2lmUT09Iiwibm9uY2UiOiIwZWU4MWRkZC00ZTc0LTQ0OTktYTI2Ni1hNDcyMjYwYThhOGQiLCJ1aV9sb2NhbGVzIjpbIml0LUlUIl0sInJlcXVlc3RfaWQiOiJaYzZCbVZXUmQ2UUZPbEhHOjc1ZWU0ZmJmLWNhZGUtNDY4OC1iMmI4LWQyNDA4YzBkYzYzNTpGUXF0eEVXUC00TFdheTVWIiwiZiI6dHJ1ZX0=&ui_locales=it-IT&passwordMeterFT=true")];
            case 1:
                _a.sent();
                USERNAME = "micheletornello5@gmail.com";
                PASSWORD = "zMm5102001";
                return [4 /*yield*/, page.waitForSelector('input[id="login.email"]')];
            case 2:
                _a.sent();
                return [4 /*yield*/, page.type('input[id="login.email"]', USERNAME)];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.type('input[id="login.secret"]', PASSWORD)];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 6:
                _a.sent();
                checkProduct();
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
var checkProduct = function () { return __awaiter(void 0, void 0, void 0, function () {
    var productsCheck, cleanProducts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
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
                            var _a;
                            var spans = Array.from(option.querySelectorAll("span"));
                            //const size = times < 10 ? "44" : "40";
                            return spans.find(function (span) { return span.textContent === "44"; })
                                ? ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.includes("Esaurito"))
                                    ? "esaurito"
                                    : option.htmlFor
                                : "non trovato";
                        });
                    })];
            case 5:
                productsCheck = _a.sent();
                cleanProducts = productsCheck.filter(function (product) { return product !== "esaurito" && product !== "non trovato"; });
                if (!cleanProducts.length) return [3 /*break*/, 8];
                return [4 /*yield*/, page.click("label[for=\"" + cleanProducts[0] + "\"]")];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.click('div[data-testid="pdp-add-to-cart"] button')];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                console.log("NOT FOUND - Reload");
                checkProduct();
                _a.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
app.listen(port, function () {
    initialisePuppeteer();
});
