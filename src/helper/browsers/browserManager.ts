import { LaunchOptions, chromium, firefox, webkit } from "playwright-core";

const options: LaunchOptions = {
    headless: !false,
}
export const invokeBrowser = () => {
    const browserType = process.env.npm_config_BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return chromium.launch(options); 

        case "firefox":
            return firefox.launch(options); 

        case "webkit":
            return webkit.launch(options);

            break;

        default:
            throw new Error("set a proper type of browser.");
    }
}