import { expect, test } from "@playwright/test";

test("Index Page", async ({ page, context }) => {
  await page.goto("/");
  await expect(page.getByTestId("signOutButton")).toBeVisible();

  // await expect(page.getByTestId("title")).toHaveText("Zeus Polls");
  // await expect(page.getByTestId("content")).toHaveText(
  //   "Zeus Polls is an open source polling platform. Create an account or start with a quick poll.",
  // );
  // await expect(page.getByTestId("github-button")).toBeVisible();
  // await expect(page.getByTestId("create-quick-poll")).toBeVisible();
});
