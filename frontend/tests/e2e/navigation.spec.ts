import { test, expect } from "@playwright/test";

test("navigates from the homepage to Download via the navbar", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("banner");
  await nav.getByRole("link", { name: "Download", exact: true }).click();
  await expect(page).toHaveURL("/download");
  await expect(page.getByText("Failed to load")).toHaveCount(0);
});

test("navigates from deprecation to the news via the navbar", async ({
  page,
}) => {
  await page.goto("/deprecation");
  await page.waitForLoadState("networkidle");
  const nav = page.getByRole("banner");
  await nav.getByRole("link", { name: "News", exact: true }).click();
  await expect(page).toHaveURL("/news");
  await expect(page.getByText("Failed to load")).toHaveCount(0);
});
