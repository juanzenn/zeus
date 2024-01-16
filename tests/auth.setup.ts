import { test as setup } from "@playwright/test";

require("dotenv").config();

setup("auth", async ({ context, page }) => {
  await page.goto("/");
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: process.env.PW_TEST_TOKEN_SESSION!,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      expires: Date.now() / 1000 + 60 * 60 * 24 * 365,
    },
  ]);
  await context.storageState({ path: "playwright/.auth/user.json" });
});
