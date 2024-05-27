import { AfterAll, After, Before, BeforeAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { Browser, Page, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger"

const fs = require("fs-extra");
let page: Page;
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos"
        },
    });
    page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

AfterStep(async function ({ pickle, result }) {
    const img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
    await this.attach(img, "image/png");
});

After(async function ({ pickle, result }) {
    let videoPath: string | null = null;
    let img: Buffer | null = null;

    if (result?.status !== Status.FAILED) {
        img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });
        const video = fixture.page.video();
        if (video) {
            videoPath = await video.path();
        }
    }

    if (result?.status === Status.FAILED) {
        if (img) {
            this.attach(img, "image/png");
        }
        if (videoPath) {
            this.attach(fs.readFileSync(videoPath), 'video/webm');
        }
    }

    await fixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});
