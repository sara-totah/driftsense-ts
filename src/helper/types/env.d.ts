export {};

declare global {
    namespace NODEJS {
        interface ENV {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "test",
            BASEURL: string,
            HEAD: "true" | "false"
        }
    }
}