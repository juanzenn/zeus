import { expect, test } from "@playwright/test";

test("Index Page", async ({ page, context }) => {
  await page.goto("/");

  // Passing test to make sure the test suite is working
  expect(true).toBe(true);
});
